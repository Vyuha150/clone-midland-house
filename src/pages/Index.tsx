import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Home, Eye } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { api } from "@/lib/api";

type Property = {
  _id: string;
  propertyName: string;
  purpose: "sale" | "rent" | "lease";
  price: number;
  propertyType: string;
  propertyCategory: string;
  location: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  areaUnit?: string;
  amenities?: string[];
  images?: string[];
  description?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  featured: boolean;
  views: number;
  createdAt: string;
};

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(api("/api/properties/featured?limit=3"), {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setFeaturedProperties(data.properties || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to fetch featured properties");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, purpose: string) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

    if (purpose === "rent") {
      return `${formatted}/month`;
    } else if (purpose === "lease") {
      return `${formatted}/year`;
    }
    return formatted;
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600">
              Experience our most distinguished properties, handpicked for the
              discerning buyer
            </p>
          </div>

          {/* Property Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Loading featured properties...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchFeaturedProperties} variant="outline">
                Try Again
              </Button>
            </div>
          ) : featuredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No featured properties available at the moment.
              </p>
              <Button variant="outline" asChild>
                <Link to="/buy">Browse All Properties</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProperties.map((property, index) => (
                <div
                  key={property._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover-scale animate-fade-in group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={api(property.images[0])}
                        alt={property.propertyName}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-64 bg-muted flex items-center justify-center">
                        <Home className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        {property.views}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                      {property.propertyName}
                    </h3>
                    <p className="text-primary text-2xl font-bold mb-2">
                      {formatPrice(property.price, property.purpose)}
                    </p>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      {property.bedrooms && (
                        <span className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} Beds
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} Baths
                        </span>
                      )}
                      {property.area && (
                        <span className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {property.area} {property.areaUnit}
                        </span>
                      )}
                    </div>

                    {property.amenities && property.amenities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Key Features:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {property.amenities
                            .slice(0, 2)
                            .map((amenity, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                {amenity}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full hover:scale-105 transition-transform duration-200"
                      asChild
                    >
                      <Link to={`/property/${property._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 animate-fade-in">
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-200"
              asChild
            >
              <Link to="/buy">
                View All Properties
                {featuredProperties.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {featuredProperties.length}+ Featured
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
