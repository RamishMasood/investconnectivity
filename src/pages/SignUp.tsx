import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [userType, setUserType] = useState<"investor" | "entrepreneur" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      
      if (event === "SIGNED_IN" && session) {
        setIsLoading(true);
        try {
          // Add longer delay to ensure trigger function completes
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          // Check if profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Error checking profile:', profileError);
            setError('Error creating user profile. Please try again.');
            toast({
              title: "Error",
              description: "There was a problem creating your profile. Please try again.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
            return;
          }

          if (!profile) {
            console.error('Profile not found after creation');
            setError('Error creating user profile. Please try again.');
            toast({
              title: "Error",
              description: "Profile creation failed. Please try again.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
            return;
          }

          console.log("Profile created successfully:", profile);
          toast({
            title: "Welcome to InvestSphere!",
            description: "Your account has been created successfully.",
          });
          navigate("/dashboard");
        } catch (err) {
          console.error('Error during sign up:', err);
          setError('An unexpected error occurred. Please try again.');
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Creating your account...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Choose Your Role</CardTitle>
              <CardDescription>Select how you want to use InvestSphere</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setUserType("investor")}
                className="w-full"
                size="lg"
              >
                I'm an Investor
              </Button>
              <Button
                onClick={() => setUserType("entrepreneur")}
                className="w-full"
                size="lg"
                variant="outline"
              >
                I'm an Entrepreneur
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join InvestSphere as an {userType === "investor" ? "investor" : "entrepreneur"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#1E40AF',
                    color: 'white',
                    borderRadius: '0.375rem',
                  },
                  anchor: {
                    color: '#1E40AF',
                  },
                },
              }}
              theme="light"
              providers={[]}
              view="sign_up"
              redirectTo={`${window.location.origin}/dashboard`}
              additionalData={{
                user_type: userType,
              }}
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;