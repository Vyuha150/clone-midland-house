import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Sell", path: "/sell" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-white shadow-lg border-b relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white rounded-b-[50px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Midland</span>
              <span className="text-primary ml-2">Real-Estate</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 hover:-translate-y-1 ${
                  isActive(item.path)
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth & Admin Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" className="hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/register">Register</Link>
            </Button>
            <Button variant="secondary" size="sm" className="hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary/90 hover:to-blue-600/90" asChild>
              <Link to="/admin">Admin Panel</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;