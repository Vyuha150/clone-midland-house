import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Building,
  Bed,
  Square,
  DollarSign,
  Bath,
  Eye,
  Star,
  Filter,
  Home,
} from "lucide-react";
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

const Buy = () => {
  // Properties state
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("all");
  const [bedroomsFilter, setBedroomsFilter] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

  const fetchProperties = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          purpose: "sale",
          page: page.toString(),
          limit: "9",
        });

        if (searchTerm) params.append("search", searchTerm);
        if (locationFilter) params.append("location", locationFilter);
        if (propertyTypeFilter && propertyTypeFilter !== "all")
          params.append("propertyType", propertyTypeFilter);
        if (bedroomsFilter && bedroomsFilter !== "all")
          params.append("bedrooms", bedroomsFilter);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);

        const res = await fetch(api(`/api/properties?${params}`), {
          credentials: "include",
        });

        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const data = await res.json();
        setProperties(data.properties || []);
        setCurrentPage(data.pagination?.current || 1);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProperties(data.pagination?.total || 0);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    },
    [
      searchTerm,
      locationFilter,
      propertyTypeFilter,
      bedroomsFilter,
      minPrice,
      maxPrice,
    ]
  );

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProperties(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchProperties(nextPage);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Find Your Perfect Home
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 h-12 text-base transition-all duration-200 hover:shadow-md focus:shadow-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Location */}
          <Card
            className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Location</h3>
            </div>
            <Input
              placeholder="Enter location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="transition-all duration-200 hover:border-primary focus:border-primary"
            />
          </Card>

          {/* Property Type */}
          <Card
            className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Building className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Property Type</h3>
            </div>
            <Select
              value={propertyTypeFilter}
              onValueChange={setPropertyTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="flats">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="plot">Plot</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          {/* BHK */}
          <Card
            className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Bed className="h-4 w-4 text-primary" />
              <h3 className="font-medium">BHK</h3>
            </div>
            <Select value={bedroomsFilter} onValueChange={setBedroomsFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4 BHK</SelectItem>
                <SelectItem value="5">5+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          {/* Min Price */}
          <Card
            className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Min Price</h3>
            </div>
            <Input
              placeholder="Min price (₹)"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="transition-all duration-200 hover:border-primary focus:border-primary"
            />
          </Card>

          {/* Max Price */}
          <Card
            className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Max Price</h3>
            </div>
            <Input
              placeholder="Max price (₹)"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="transition-all duration-200 hover:border-primary focus:border-primary"
            />
          </Card>
        </div>

        {/* Search Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="px-8"
            onClick={handleSearch}
            disabled={loading}
          >
            <Filter className="h-4 w-4 mr-2" />
            {loading ? "Searching..." : "Search Properties"}
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Properties for Sale</h2>
            <p className="text-muted-foreground">
              {loading
                ? "Loading..."
                : `Showing ${properties.length} of ${totalProperties} results`}
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => fetchProperties()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : properties.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No properties found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setPropertyTypeFilter("all");
                  setBedroomsFilter("all");
                  setMinPrice("");
                  setMaxPrice("");
                  fetchProperties();
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <div
                  key={property._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover-scale animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
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

                    <div className="absolute top-4 left-4 flex gap-2">
                      {property.featured && (
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm capitalize">
                        For {property.purpose}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {property.views}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                      {property.propertyName}
                    </h3>
                    <p className="text-primary text-2xl font-bold mb-2">
                      {formatPrice(property.price)}
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

          {/* Load More */}
          {properties.length > 0 && currentPage < totalPages && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More Properties"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
