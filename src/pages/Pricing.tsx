import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-lg p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-600">/mo</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Browse public listings</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Basic search</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Email support</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline">Get Started</Button>
          </div>

          {/* Basic Plan */}
          <div className="border rounded-lg p-8 bg-white shadow-sm hover:shadow-md transition-shadow relative">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
              Popular
            </div>
            <h2 className="text-2xl font-bold mb-4">Basic</h2>
            <p className="text-4xl font-bold mb-6">$49<span className="text-lg text-gray-600">/mo</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>All Free features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Contact information access</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced search</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Priority support</span>
              </li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-600">/mo</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>All Basic features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Early access to listings</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Direct messaging</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Investment analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>24/7 phone support</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline">Get Started</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;