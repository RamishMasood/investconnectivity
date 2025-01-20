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
import type { AuthError } from "@supabase/supabase-js";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [userType, setUserType] = useState<"investor" | "entrepreneur" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
      if (event === "USER_UPDATED") {
        const checkSession = async () => {
          const { error } = await supabase.auth.getSession();
          if (error) {
            setError(getErrorMessage(error));
          }
        };
        checkSession();
      }
      if (event === "SIGNED_OUT") {
        setError("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      default:
        return error.message;
    }
  };

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
              appearance={{ theme: ThemeSupa }}
              theme="light"
              providers={[]}
              view="sign_up"
              redirectTo="/dashboard"
              options={{
                emailRedirectTo: `${window.location.origin}/dashboard`,
                data: {
                  user_type: userType,
                },
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