import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Building, Bed, Square, DollarSign } from "lucide-react";

const Rent = () => {
  const [priceRange, setPriceRange] = useState([0]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Find Your Perfect Rental</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rental properties..."
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
                  <Checkbox id={`rent-${range}`} />
                  <label htmlFor={`rent-${range}`} className="text-sm">{range}</label>
                </div>
              ))}
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
                step={5000}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Rent Range: ₹{priceRange[0]} - ₹50,000/month
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
          <Button size="lg" className="px-8">
            Search Rentals
          </Button>
        </div>

        {/* Results would go here */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>No rental properties found. Try adjusting your search criteria.</p>
        </div>
      </div>
    </div>
  );
};

export default Rent;