import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuthError } from "@supabase/supabase-js";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
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
        setError(""); // Clear errors on sign out
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join InvestSphere as an investor or entrepreneur</CardDescription>
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
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;