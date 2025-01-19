import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Listings = () => {
  // Mock data for initial display
  const listings = [
    {
      id: 1,
      title: "AI-Powered Healthcare Platform",
      description: "Revolutionary healthcare platform using artificial intelligence for early disease detection",
      category: "Healthcare",
      investmentRange: "$500K - $1M",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Sustainable Energy Solution",
      description: "Innovative renewable energy technology for residential buildings",
      category: "Clean Energy",
      investmentRange: "$1M - $2M",
      location: "Austin, TX",
    },
    {
      id: 3,
      title: "EdTech Learning Platform",
      description: "Personalized learning platform for K-12 students using adaptive technology",
      category: "Education",
      investmentRange: "$250K - $500K",
      location: "Boston, MA",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Investment Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>{listing.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{listing.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Investment Range:</span> {listing.investmentRange}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Location:</span> {listing.location}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Listings;