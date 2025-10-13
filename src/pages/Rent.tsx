import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Building,
  Bed,
  Square,
  DollarSign,
  Eye,
  Heart,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api } from "@/lib/api";

interface Property {
  _id: string;
  propertyName: string;
  description?: string;
  purpose: "sale" | "rent" | "lease";
  propertyType: string;
  propertyCategory?: string;
  price: number;
  location: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  areaUnit?: string;
  amenities?: string[];
  images?: string[];
  featured: boolean;
  status: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  views: number;
  userId?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const Rent = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });

  const fetchProperties = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        purpose: "rent", // Filter for rental properties only
        page: page.toString(),
        limit: "12",
      });

      if (location.trim()) params.append("location", location);
      if (propertyType) params.append("propertyType", propertyType);
      if (bedrooms) params.append("bedrooms", bedrooms);
      if (priceRange[0] > 0)
        params.append("minPrice", priceRange[0].toString());
      if (priceRange[1] < 50000)
        params.append("maxPrice", priceRange[1].toString());

      const response = await fetch(api(`/api/properties?${params}`), {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch rental properties");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log
      console.log("Properties found:", data.properties?.length || 0); // Debug log
      setProperties(data.properties || []);
      setPagination(data.pagination || { current: 1, pages: 1, total: 0 });
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load rental properties"
      );
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    fetchProperties(1);
  };

  const handleAreaToggle = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Find Your Perfect Rental
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rental properties..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Location */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Location</h3>
            </div>
            <Input
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Card>

          {/* Property Type */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Property Type</h3>
            </div>
            <select
              className="w-full p-2 border rounded-md"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </Card>

          {/* BHK */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Bed className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Bedrooms</h3>
            </div>
            <select
              className="w-full p-2 border rounded-md"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </Card>

          {/* Area */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Square className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Area (sq.ft)</h3>
            </div>
            <div className="space-y-2">
              {["0-500", "500-1000", "1000-1500", "1500-2000", "2000+"].map(
                (range) => (
                  <div key={range} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rent-${range}`}
                      checked={selectedAreas.includes(range)}
                      onCheckedChange={() => handleAreaToggle(range)}
                    />
                    <label htmlFor={`rent-${range}`} className="text-sm">
                      {range}
                    </label>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Price Range */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Monthly Rent</h3>
            </div>
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50000}
                step={1000}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                ₹{priceRange[0].toLocaleString()} - ₹
                {priceRange[1].toLocaleString()}/month
              </p>
            </div>
          </Card>
        </div>

        {/* Verified Properties Checkbox */}
        <div className="flex items-center space-x-2 mb-8">
          <Checkbox
            id="verified-rent"
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
          />
          <label htmlFor="verified-rent" className="text-sm font-medium">
            Verified Properties Only
          </label>
        </div>

        {/* Search Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="px-8"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Rentals"}
          </Button>
        </div>

        {/* Results */}
        <div className="mt-12">
          {error && (
            <div className="text-center text-red-500 mb-8">
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center text-muted-foreground mb-8">
              <p>Loading rental properties...</p>
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>
                No rental properties found. Try adjusting your search criteria.
              </p>
            </div>
          )}

          {!loading && !error && properties.length > 0 && (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {properties.length} of {pagination.total} rental
                  properties
                </p>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <Card
                    key={property._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Property Image */}
                    <div className="relative h-48 overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={api(property.images[0])}
                          alt={property.propertyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Building className="h-12 w-12 text-gray-400" />
                        </div>
                      )}

                      {/* Featured Badge */}
                      {property.featured && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500">
                          Featured
                        </Badge>
                      )}

                      {/* Property Type Badge */}
                      <Badge className="absolute top-2 right-2 bg-primary">
                        {property.propertyType}
                      </Badge>
                    </div>

                    {/* Property Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 truncate">
                        {property.propertyName}
                      </h3>

                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.bedrooms} BHK</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            <span>
                              {property.area} {property.areaUnit || "sq.ft"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl font-bold text-primary">
                          ₹{property.price.toLocaleString()}/month
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{property.views || 0} views</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(property.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Amenities */}
                      {property.amenities && property.amenities.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {property.amenities
                              .slice(0, 3)
                              .map((amenity, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {amenity}
                                </Badge>
                              ))}
                            {property.amenities.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{property.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Owner Info */}
                      <div className="text-sm text-muted-foreground mb-3">
                        Listed by:{" "}
                        <span className="font-medium">
                          {property.userId.name}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() =>
                            (window.location.href = `/property/${property._id}`)
                          }
                        >
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchProperties(pagination.current - 1)}
                    disabled={pagination.current === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === pagination.pages ||
                          Math.abs(page - pagination.current) <= 1
                      )
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )}
                          <Button
                            variant={
                              page === pagination.current
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => fetchProperties(page)}
                          >
                            {page}
                          </Button>
                        </div>
                      ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchProperties(pagination.current + 1)}
                    disabled={pagination.current === pagination.pages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rent;
