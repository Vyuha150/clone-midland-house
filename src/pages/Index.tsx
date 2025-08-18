import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import featuredProperty1 from "@/assets/featured-property-1.jpg";
import featuredProperty2 from "@/assets/featured-property-2.jpg";
import featuredProperty3 from "@/assets/featured-property-3.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Background Video */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with parallax effect */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Logo and Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="mb-12">
            <img 
              src="/lovable-uploads/674c43b8-f787-4efc-831c-9e061904f904.png"
              alt="Mid-Land Real Estate Services"
              className="h-48 md:h-64 w-auto mx-auto mb-8 animate-fade-in drop-shadow-2xl"
            />
          </div>
          
          <p className="text-lg md:text-xl font-medium mb-8 animate-fade-in text-gray-100">
            Luxury living redefined. Find your perfect home with us.
          </p>
          
          <div className="mt-12 animate-fade-in">
            <Button size="lg" className="px-8 py-6 text-lg hover-scale" asChild>
              <Link to="/buy">Explore Properties</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">
              Experience our most distinguished properties, handpicked for the discerning buyer
            </p>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                image: featuredProperty1,
                title: "Luxury Villa with Pool",
                price: "$2,850,000",
                location: "Beverly Hills, CA"
              },
              {
                id: 2,
                image: featuredProperty2, 
                title: "Modern City Apartment",
                price: "$1,250,000",
                location: "Downtown, NY"
              },
              {
                id: 3,
                image: featuredProperty3,
                title: "Beachfront Penthouse",
                price: "$3,200,000",
                location: "Malibu, CA"
              }
            ].map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover-scale">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-primary text-2xl font-bold mb-2">{property.price}</p>
                  <p className="text-gray-600">{property.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/buy">View All Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
