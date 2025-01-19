import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-light animate-gradient bg-[length:400%_400%] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Where Great Ideas Meet Smart Investment
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with investors who believe in your vision or discover the next big opportunity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-primary">
                List Your Idea
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Start Investing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Technology
                    </span>
                    <span className="text-gray-600">$50K - $200K</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Healthcare Solution</h3>
                  <p className="text-gray-600 mb-4">
                    Revolutionary healthcare platform utilizing artificial intelligence...
                  </p>
                  <div className="blur-sm">
                    <p className="text-sm text-gray-500">Contact: john@example.com</p>
                  </div>
                  <Button className="w-full mt-4">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "List Your Idea",
                description: "Create a detailed listing of your business idea or startup.",
              },
              {
                title: "Connect with Investors",
                description: "Get discovered by investors looking for opportunities like yours.",
              },
              {
                title: "Secure Investment",
                description: "Negotiate terms and receive funding to grow your business.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                features: ["Browse public listings", "Basic search", "Email support"],
              },
              {
                name: "Basic",
                price: "$49",
                features: [
                  "All Free features",
                  "Contact information access",
                  "Advanced search",
                  "Priority support",
                ],
              },
              {
                name: "Premium",
                price: "$99",
                features: [
                  "All Basic features",
                  "Early access to listings",
                  "Direct messaging",
                  "Investment analytics",
                  "24/7 phone support",
                ],
              },
            ].map((plan) => (
              <Card key={plan.name} className="relative overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;