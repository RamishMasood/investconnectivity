import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Startup = Database["public"]["Tables"]["startups"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

export const EntrepreneurDashboard = () => {
  const [favorites, setFavorites] = useState<Startup[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch favorites
      const { data: favoritesData } = await supabase
        .from("favorites")
        .select(`
          startup_id,
          startups (*)
        `)
        .eq("user_id", user.id);

      if (favoritesData) {
        const startups = favoritesData.map((f: any) => f.startups);
        setFavorites(startups);
      }

      // Fetch subscription
      const { data: subscriptionData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (subscriptionData) {
        setSubscription(subscriptionData);
      }
    };

    fetchData();
  }, []);

  const handleUpgradeSubscription = async () => {
    // This will be implemented with Stripe integration
    console.log("Upgrade subscription clicked");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Entrepreneur Dashboard</h1>

      <Tabs defaultValue="favorites">
        <TabsList>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((startup) => (
              <Card key={startup.id}>
                <CardHeader>
                  <CardTitle>{startup.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{startup.description}</p>
                  <div className="mt-4">
                    <Link to={`/startup/${startup.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscription" className="mt-6">
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};