import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Home, MapPin, User, Phone, Mail, FileText, DollarSign, Camera } from "lucide-react";

const Sell = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propertyType: "",
    listingType: "",
    title: "",
    description: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    amenities: [],
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    preferredContact: "",
    availableFrom: "",
    furnished: "",
    images: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Property Listed Successfully!",
      description: "Your property has been submitted for review. We'll contact you soon.",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Sell Your Property</h1>
          <p className="text-muted-foreground">
            List your property with us and reach thousands of potential buyers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listingType">Listing Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("listingType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="lease">For Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern 3-bedroom apartment in downtown"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Property Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    placeholder="₹ 0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq.ft) *</Label>
                  <Input
                    id="area"
                    placeholder="1200"
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select onValueChange={(value) => handleInputChange("bedrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4">4 BHK</SelectItem>
                      <SelectItem value="5">5+ BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select onValueChange={(value) => handleInputChange("bathrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Furnished Status</Label>
                <RadioGroup
                  value={formData.furnished}
                  onValueChange={(value) => handleInputChange("furnished", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="furnished" id="furnished" />
                    <Label htmlFor="furnished">Furnished</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semi-furnished" id="semi-furnished" />
                    <Label htmlFor="semi-furnished">Semi-Furnished</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unfurnished" id="unfurnished" />
                    <Label htmlFor="unfurnished">Unfurnished</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address with landmarks"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="Enter ZIP code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    placeholder="Enter your full name"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Phone Number *</Label>
                  <Input
                    id="ownerPhone"
                    placeholder="+91 9876543210"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Email Address *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.ownerEmail}
                  onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Preferred Contact Method</Label>
                <RadioGroup
                  value={formData.preferredContact}
                  onValueChange={(value) => handleInputChange("preferredContact", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="contact-phone" />
                    <Label htmlFor="contact-phone">Phone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="contact-email" />
                    <Label htmlFor="contact-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="contact-both" />
                    <Label htmlFor="contact-both">Both</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="availableFrom">Available From</Label>
                <Input
                  id="availableFrom"
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Swimming Pool", "Gym", "Parking", "Security",
                    "Elevator", "Garden", "Balcony", "AC",
                    "Internet", "Power Backup", "Water Supply", "Club House"
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Property Images</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">Upload property images</p>
                  <p className="text-sm text-muted-foreground mb-4">Support: JPG, PNG, GIF (Max 5MB each)</p>
                  <Button type="button" variant="outline">
                    Choose Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <span className="text-primary underline cursor-pointer">
                    Terms and Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-primary underline cursor-pointer">
                    Privacy Policy
                  </span>
                </Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" size="lg" className="flex-1">
                  Submit Property Listing
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Sell;