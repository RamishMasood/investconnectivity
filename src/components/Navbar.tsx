import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Navbar auth event:", event);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">InvestSphere</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link to="/listings" className="text-gray-700 hover:text-primary px-3 py-2">
              Browse Ideas
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary px-3 py-2">
              Pricing
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2">
              Contact
            </Link>
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="outline" className="mr-4">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin">
                      <Button variant="outline" className="ml-4">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/listings"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Browse Ideas
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Contact
              </Link>
              {!isLoading && (
                <div className="mt-4 space-y-2">
                  {user ? (
                    <>
                      <Link to="/dashboard" className="block">
                        <Button variant="outline" className="w-full mb-2">
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={handleSignOut} className="w-full">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="block">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/signup" className="block">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};