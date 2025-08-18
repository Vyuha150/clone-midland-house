import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Building, Bed, Square, DollarSign } from "lucide-react";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";

const Buy = () => {
  const [priceRange, setPriceRange] = useState([0]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Find Your Perfect Home</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-10 h-12 text-base"
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
            <Input placeholder="Enter location" />
          </Card>

          {/* Property Type */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Property Type</h3>
            </div>
            <Input placeholder="Select type" />
          </Card>

          {/* BHK */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Bed className="h-4 w-4 text-primary" />
              <h3 className="font-medium">BHK</h3>
            </div>
            <Input placeholder="Select BHK" />
          </Card>

          {/* Area */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Square className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Area (sq.ft)</h3>
            </div>
            <div className="space-y-2">
              {["0-500", "500-1000", "1000-1500", "1500-2000", "2000+"].map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox id={range} />
                  <label htmlFor={range} className="text-sm">{range}</label>
                </div>
              ))}
            </div>
          </Card>

          {/* Price Range */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Price Range</h3>
            </div>
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={2000}
                step={100}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Price Range: ₹{priceRange[0]} - ₹20.00 L
              </p>
            </div>
          </Card>
        </div>

        {/* Verified Properties Checkbox */}
        <div className="flex items-center space-x-2 mb-8">
          <Checkbox 
            id="verified" 
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
          />
          <label htmlFor="verified" className="text-sm font-medium">
            Verified Properties Only
          </label>
        </div>

        {/* Search Button */}
        <div className="text-center">
          <Button size="lg" className="px-8">
            Search Properties
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Properties</h2>
            <p className="text-muted-foreground">Showing 3 results</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property 1 */}
            <Card className="overflow-hidden hover-scale">
              <div className="aspect-video relative">
                <img
                  src={property1}
                  alt="Modern luxury house"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                    For Sale
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-foreground px-2 py-1 rounded text-sm font-medium">
                    ₹2.5 Cr
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Modern Luxury Villa</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Beverly Hills, CA • 4 BHK • 3500 sq.ft
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>🛏️ 4</span>
                    <span>🚿 3</span>
                    <span>🚗 2</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            {/* Property 2 */}
            <Card className="overflow-hidden hover-scale">
              <div className="aspect-video relative">
                <img
                  src={property2}
                  alt="Elegant villa with pool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                    For Sale
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-foreground px-2 py-1 rounded text-sm font-medium">
                    ₹3.2 Cr
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Elegant Villa with Pool</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Miami, FL • 5 BHK • 4200 sq.ft
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>🛏️ 5</span>
                    <span>🚿 4</span>
                    <span>🚗 3</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            {/* Property 3 */}
            <Card className="overflow-hidden hover-scale">
              <div className="aspect-video relative">
                <img
                  src={property3}
                  alt="Contemporary apartment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-medium">
                    For Rent
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-foreground px-2 py-1 rounded text-sm font-medium">
                    ₹85,000/mo
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Contemporary Apartment</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Downtown NYC • 3 BHK • 2100 sq.ft
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>🛏️ 3</span>
                    <span>🚿 2</span>
                    <span>🚗 1</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;