import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Button variant="outline" className="ml-4">
              Sign In
            </Button>
            <Button>Get Started</Button>
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
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};