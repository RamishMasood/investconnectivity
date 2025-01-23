import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, CreditCard, Search, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Startup = Database["public"]["Tables"]["startups"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

export const EntrepreneurDashboard = () => {
  const [favorites, setFavorites] = useState<Startup[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch favorites
      const { data: favoritesData, error: favoritesError } = await supabase
        .from("favorites")
        .select(`
          startup_id,
          startups (*)
        `)
        .eq("user_id", user.id);

      if (favoritesError) {
        toast({
          title: "Error",
          description: "Failed to fetch favorites",
          variant: "destructive",
        });
        return;
      }

      if (favoritesData) {
        const startups = favoritesData.map((f: any) => f.startups);
        setFavorites(startups);
      }

      // Fetch subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') {
        toast({
          title: "Error",
          description: "Failed to fetch subscription status",
          variant: "destructive",
        });
        return;
      }

      if (subscriptionData) {
        setSubscription(subscriptionData);
      }
    };

    fetchData();
  }, [toast]);

  const filteredFavorites = favorites.filter(startup =>
    startup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpgradeSubscription = async () => {
    toast({
      title: "Coming Soon",
      description: "Subscription upgrades will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Entrepreneur Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your favorite startups and subscription</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Ideas</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{subscription?.plan_type || "Free"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscription?.end_date
                ? Math.max(0, Math.ceil((new Date(subscription.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                : "∞"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="favorites" className="space-y-6">
        <TabsList>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((startup) => (
                <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{startup.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{startup.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-primary/10 rounded text-sm">{startup.category}</span>
                      <span className="px-2 py-1 bg-primary/10 rounded text-sm">{startup.investment_range}</span>
                      <span className="px-2 py-1 bg-primary/10 rounded text-sm">{startup.location}</span>
                    </div>
                    <Link to={`/startup/${startup.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan: {subscription?.plan_type || "Free"}</CardTitle>
            </CardHeader>
            <CardContent>
              {subscription?.plan_type === "free" ? (
                <div className="space-y-4">
                  <p>Upgrade to access contact information and save your favorite listings!</p>
                  <Button onClick={handleUpgradeSubscription}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Now
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>You're on the {subscription?.plan_type} plan</p>
                  <p>Valid until: {new Date(subscription?.end_date || "").toLocaleDateString()}</p>
                  <Button onClick={handleUpgradeSubscription} variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Change Plan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};