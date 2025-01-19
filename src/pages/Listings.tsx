import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Banknote } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Listings = () => {
  const listings = [
    {
      id: 1,
      title: "AI-Powered Healthcare Platform",
      description: "Revolutionary healthcare platform using artificial intelligence for early disease detection",
      category: "Healthcare",
      investmentRange: "$500K - $1M",
      location: "San Francisco, CA",
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
    {
      id: 2,
      title: "Sustainable Energy Solution",
      description: "Innovative renewable energy technology for residential buildings",
      category: "Clean Energy",
      investmentRange: "$1M - $2M",
      location: "Austin, TX",
      bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      id: 3,
      title: "EdTech Learning Platform",
      description: "Personalized learning platform for K-12 students using adaptive technology",
      category: "Education",
      investmentRange: "$250K - $500K",
      location: "Boston, MA",
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Investment Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover innovative startups and groundbreaking projects seeking investment across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <Card 
                key={listing.id} 
                className={`transform hover:scale-105 transition-all duration-300 border-none shadow-md hover:shadow-xl ${listing.bgGradient}`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {listing.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{listing.title}</CardTitle>
                  <CardDescription className="text-gray-500 mt-2">{listing.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Banknote className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm">{listing.investmentRange}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                    <button className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Listings;