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
          <div className="mb-0">
            <img 
              src="/lovable-uploads/674c43b8-f787-4efc-831c-9e061904f904.png"
              alt="Mid-Land Real Estate Services"
              className="h-96 md:h-[32rem] w-auto mx-auto mb-0 animate-fade-in drop-shadow-2xl"
            />
          </div>
          
          <p className="text-lg md:text-xl font-medium mb-1 animate-fade-in text-gray-100">
            Luxury living redefined. Find your perfect home with us.
          </p>
          
          <div className="mt-1 animate-fade-in">
            <Button size="lg" className="px-8 py-6 text-lg hover-scale" asChild>
              <Link to="/buy">Explore Properties</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
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
                location: "Beverly Hills, CA",
                bedrooms: "4",
                bathrooms: "3",
                area: "3,500 sq ft",
                features: ["Swimming Pool", "Garden", "Garage", "Security System"]
              },
              {
                id: 2,
                image: featuredProperty2, 
                title: "Modern City Apartment",
                price: "$1,250,000",
                location: "Downtown, NY",
                bedrooms: "3",
                bathrooms: "2",
                area: "2,100 sq ft",
                features: ["City View", "Gym", "Concierge", "Balcony"]
              },
              {
                id: 3,
                image: featuredProperty3,
                title: "Beachfront Penthouse",
                price: "$3,200,000",
                location: "Malibu, CA",
                bedrooms: "5",
                bathrooms: "4",
                area: "4,200 sq ft",
                features: ["Ocean View", "Private Beach", "Wine Cellar", "Rooftop Terrace"]
              }
            ].map((property, index) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover-scale animate-fade-in group" 
                   style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                    {property.title}
                  </h3>
                  <p className="text-primary text-2xl font-bold mb-2">{property.price}</p>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center">🛏️ {property.bedrooms} Beds</span>
                    <span className="flex items-center">🚿 {property.bathrooms} Baths</span>
                    <span className="flex items-center">📐 {property.area}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {property.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full hover:scale-105 transition-transform duration-200">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/buy">View All Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
