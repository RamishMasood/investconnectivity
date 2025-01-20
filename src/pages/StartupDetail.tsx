import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building2, MapPin, Banknote, Mail, Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const StartupDetail = () => {
  const { id } = useParams();
  const isSubscribed = false; // This will be controlled by subscription status

  const handleSubscribe = () => {
    toast.info("Subscription functionality will be available after Supabase and Stripe integration");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Technology
              </span>
            </div>
            <CardTitle className="text-3xl">AI-Powered Healthcare Solution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-600">
                Revolutionary healthcare platform utilizing artificial intelligence for early disease
                detection and personalized treatment recommendations. Our solution combines machine
                learning algorithms with medical expertise to provide accurate diagnostics and improve
                patient outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Banknote className="h-5 w-5 text-primary" />
                <span>Investment Range: $500K - $1M</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Location: San Francisco, CA</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              {isSubscribed ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@healthtech.ai</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">
                    Subscribe to view contact information and connect with this startup
                  </p>
                  <Button onClick={handleSubscribe}>Subscribe Now</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default StartupDetail;