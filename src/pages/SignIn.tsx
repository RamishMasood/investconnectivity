import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      
      if (event === "SIGNED_IN" && session) {
        setIsLoading(true);
        try {
          // Add longer delay to ensure profile is created
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          // Check if profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Error checking profile:', profileError);
            setError('Error checking user profile. Please try again.');
            toast({
              title: "Error",
              description: "There was a problem signing you in. Please try again.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
            return;
          }

          if (!profile) {
            console.error('Profile not found');
            setError('Profile not found. Please try signing up first.');
            toast({
              title: "Error",
              description: "Profile not found. Please try signing up first.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
            return;
          }

          console.log("Profile found successfully:", profile);
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate("/dashboard");
        } catch (err) {
          console.error('Error during sign in:', err);
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
            <p className="text-muted-foreground">Signing you in...</p>
          </div>
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
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Welcome back to InvestSphere</CardDescription>
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
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;