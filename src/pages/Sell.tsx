import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Home, MapPin, User, Phone, Mail, FileText, DollarSign, Camera, Check } from "lucide-react";

const Sell = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    propertyName: "",
    purpose: "",
    price: [10000],
    propertyType: "",
    propertyCategory: "",
    location: "",
    
    // Property Details
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnished: "",
    flooring: "",
    facing: "",
    
    // Amenities
    amenities: [],
    
    // Media
    images: [],
    virtualTour: "",
    
    // Additional Information
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    availableFrom: "",
    terms: false
  });

  const steps = [
    { id: 1, title: "Basic Information", subtitle: "Property name, type, and location details" },
    { id: 2, title: "Property Details", subtitle: "Specific details based on property type" },
    { id: 3, title: "Amenities", subtitle: "Available facilities and features" },
    { id: 4, title: "Media", subtitle: "Images and videos of your property" },
    { id: 5, title: "Additional Information", subtitle: "Overview and other specifications" }
  ];

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

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex flex-col items-center ${index !== steps.length - 1 ? 'mr-8' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === step.id 
                ? 'bg-primary text-primary-foreground' 
                : currentStep > step.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-muted text-muted-foreground'
            }`}>
              {currentStep > step.id ? <Check className="w-6 h-6" /> : step.id}
            </div>
            <div className="text-center mt-2 max-w-[120px]">
              <div className={`text-sm font-medium ${currentStep === step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {step.subtitle}
              </div>
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div className={`w-16 h-0.5 ${currentStep > step.id ? 'bg-green-500' : 'bg-muted'} mb-8`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyName">Property Name*</Label>
                  <Input
                    id="propertyName"
                    placeholder="Enter property name"
                    value={formData.propertyName}
                    onChange={(e) => handleInputChange("propertyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose*</Label>
                  <Select onValueChange={(value) => handleInputChange("purpose", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="For Sale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="lease">For Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Price</Label>
                <div className="px-4">
                  <Slider
                    value={formData.price}
                    onValueChange={(value) => handleInputChange("price", value)}
                    max={20000000}
                    min={10000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>₹10K</span>
                    <span className="font-medium">Selected: ₹{formData.price[0].toLocaleString()}</span>
                    <span>₹20Cr</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type*</Label>
                  <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Flats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flats">Flats</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="shop">Shop</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location*</Label>
                  <Select onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vijayawada" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vijayawada">Vijayawada</SelectItem>
                      <SelectItem value="guntur">Guntur</SelectItem>
                      <SelectItem value="tenali">Tenali</SelectItem>
                      <SelectItem value="mangalagiri">Mangalagiri</SelectItem>
                      <SelectItem value="amaravati">Amaravati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyCategory">Property Category*</Label>
                <Select onValueChange={(value) => handleInputChange("propertyCategory", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Residential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq.ft)</Label>
                  <Input
                    id="area"
                    placeholder="1200"
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Furnished Status</Label>
                  <RadioGroup
                    value={formData.furnished}
                    onValueChange={(value) => handleInputChange("furnished", value)}
                    className="grid grid-cols-1 gap-3"
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
                <div className="space-y-2">
                  <Label htmlFor="facing">Facing</Label>
                  <Select onValueChange={(value) => handleInputChange("facing", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select facing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                      <SelectItem value="north-east">North-East</SelectItem>
                      <SelectItem value="north-west">North-West</SelectItem>
                      <SelectItem value="south-east">South-East</SelectItem>
                      <SelectItem value="south-west">South-West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flooring">Flooring</Label>
                <Select onValueChange={(value) => handleInputChange("flooring", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flooring type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marble">Marble</SelectItem>
                    <SelectItem value="tiles">Tiles</SelectItem>
                    <SelectItem value="wooden">Wooden</SelectItem>
                    <SelectItem value="granite">Granite</SelectItem>
                    <SelectItem value="concrete">Concrete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Amenities</CardTitle>
              <p className="text-muted-foreground">Available facilities and features</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Swimming Pool", "Gym", "Parking", "Security",
                  "Elevator", "Garden", "Balcony", "AC",
                  "Internet", "Power Backup", "Water Supply", "Club House",
                  "Kids Play Area", "CCTV", "Intercom", "Fire Safety"
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange("amenities", [...formData.amenities, amenity]);
                        } else {
                          handleInputChange("amenities", formData.amenities.filter(a => a !== amenity));
                        }
                      }}
                    />
                    <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Media</CardTitle>
              <p className="text-muted-foreground">Images and videos of your property</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="images">Property Images</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Upload property images</p>
                  <p className="text-sm text-muted-foreground mb-4">Support: JPG, PNG, GIF (Max 5MB each)</p>
                  <Button type="button" variant="outline" size="lg">
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">You can upload up to 20 images</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="virtualTour">Virtual Tour Link (Optional)</Label>
                <Input
                  id="virtualTour"
                  placeholder="https://your-virtual-tour-link.com"
                  value={formData.virtualTour}
                  onChange={(e) => handleInputChange("virtualTour", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Additional Information</CardTitle>
              <p className="text-muted-foreground">Overview and other specifications</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name*</Label>
                  <Input
                    id="ownerName"
                    placeholder="Enter your full name"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Phone Number*</Label>
                  <Input
                    id="ownerPhone"
                    placeholder="+91 9876543210"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Email Address*</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.ownerEmail}
                    onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => handleInputChange("terms", checked)}
                />
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
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
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

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep === 5 ? (
              <Button 
                type="submit" 
                className="flex items-center gap-2"
                disabled={!formData.terms}
              >
                Submit Property Listing
                <Check className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;