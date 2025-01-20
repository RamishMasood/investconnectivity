import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Startup = Database["public"]["Tables"]["startups"]["Row"];

export const InvestorDashboard = () => {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("startups")
        .select("*")
        .eq("owner_id", user.id);

      if (data) {
        setStartups(data);
      }
    };

    fetchStartups();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investor Dashboard</h1>
        <Link to="/startup/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <Card key={startup.id}>
            <CardHeader>
              <CardTitle>{startup.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{startup.description}</p>
              <div className="mt-4">
                <Link to={`/startup/${startup.id}/edit`}>
                  <Button variant="outline" className="w-full">
                    Edit Listing
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