import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Startup = Database["public"]["Tables"]["startups"]["Row"];

export const InvestorDashboard = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchStartups = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .eq("owner_id", user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch your listings",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setStartups(data);
      }
      setIsLoading(false);
    };

    fetchStartups();
  }, [toast]);

  const filteredStartups = startups.filter(startup =>
    startup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your investment opportunities</p>
        </div>
        <Link to="/startup/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold">Total Listings</h3>
            <p className="text-2xl font-bold">{startups.length}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold">Active Listings</h3>
            <p className="text-2xl font-bold">{startups.length}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold">Total Views</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => (
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
              <div className="space-y-2">
                <Link to={`/startup/${startup.id}/edit`}>
                  <Button variant="outline" className="w-full">
                    Edit Listing
                  </Button>
                </Link>
                <Link to={`/startup/${startup.id}`}>
                  <Button variant="secondary" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};