import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="brand-text text-xl">Appoint<span>Ease</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#services" className="text-gray-600 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <Link href="#book-now" className="hidden md:inline-block">
            <Button>Book Now</Button>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="#services" 
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                How It Works
              </Link>
              <Link 
                href="#testimonials" 
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Testimonials
              </Link>
              <Link 
                href="#contact" 
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link 
                href="#book-now"
                onClick={closeMobileMenu}
              >
                <Button className="w-full">Book Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
