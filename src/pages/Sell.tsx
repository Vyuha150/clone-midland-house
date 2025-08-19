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
    areaUnit: "sq_yard",
    dimensionsLength: "",
    dimensionsWidth: "",
    dimensionsUnit: "feet",
    carpetArea: "",
    carpetAreaUnit: "sq_ft",
    builtUpArea: "",
    builtUpAreaUnit: "sq_ft",
    furnished: "unfurnished",
    flooring: "tiles",
    boundaryWall: "",
    locationMapUrl: "",
    plotArea: "",
    plotAreaUnit: "sq_yard",
    plotLength: "",
    plotWidth: "",
    plotFacing: "north",
    plotBoundaryWall: "",
    bhk: "",
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
              {/* Bedrooms and Bathrooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Number of Bedrooms*</Label>
                  <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4 Bedrooms</SelectItem>
                      <SelectItem value="5">5 Bedrooms</SelectItem>
                      <SelectItem value="6+">6+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Number of Bathrooms*</Label>
                  <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="4">4 Bathrooms</SelectItem>
                      <SelectItem value="5">5 Bathrooms</SelectItem>
                      <SelectItem value="6+">6+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Area with unit dropdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area*</Label>
                  <Input
                    id="area"
                    placeholder="Enter area"
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Select value={formData.areaUnit} onValueChange={(value) => handleInputChange("areaUnit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perch">Perch</SelectItem>
                      <SelectItem value="sq_yard">Sq. Yard</SelectItem>
                      <SelectItem value="sq_meter">Sq. Meter</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="marla">Marla</SelectItem>
                      <SelectItem value="cents">Cents</SelectItem>
                      <SelectItem value="bigha">Bigha</SelectItem>
                      <SelectItem value="kottah">Kottah</SelectItem>
                      <SelectItem value="kanal">Kanal</SelectItem>
                      <SelectItem value="grounds">Grounds</SelectItem>
                      <SelectItem value="ares">Ares</SelectItem>
                      <SelectItem value="biswa">Biswa</SelectItem>
                      <SelectItem value="guntha">Guntha</SelectItem>
                      <SelectItem value="aankadam">Aankadam</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="rood">Rood</SelectItem>
                      <SelectItem value="chataks">Chataks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dimensions (Length x Width) */}
              <div className="space-y-2">
                <Label>Dimensions (Length x Width)*</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Length"
                    value={formData.dimensionsLength}
                    onChange={(e) => handleInputChange("dimensionsLength", e.target.value)}
                  />
                  <Input
                    placeholder="Width"
                    value={formData.dimensionsWidth}
                    onChange={(e) => handleInputChange("dimensionsWidth", e.target.value)}
                  />
                  <Select value={formData.dimensionsUnit} onValueChange={(value) => handleInputChange("dimensionsUnit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="meter">Meter</SelectItem>
                      <SelectItem value="yard">Yard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Carpet Area */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carpetArea">Carpet Area*</Label>
                  <Input
                    id="carpetArea"
                    placeholder="Enter carpet area"
                    value={formData.carpetArea}
                    onChange={(e) => handleInputChange("carpetArea", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Select value={formData.carpetAreaUnit} onValueChange={(value) => handleInputChange("carpetAreaUnit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perch">Perch</SelectItem>
                      <SelectItem value="sq_yard">Sq. Yard</SelectItem>
                      <SelectItem value="sq_meter">Sq. Meter</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="marla">Marla</SelectItem>
                      <SelectItem value="cents">Cents</SelectItem>
                      <SelectItem value="bigha">Bigha</SelectItem>
                      <SelectItem value="kottah">Kottah</SelectItem>
                      <SelectItem value="kanal">Kanal</SelectItem>
                      <SelectItem value="grounds">Grounds</SelectItem>
                      <SelectItem value="ares">Ares</SelectItem>
                      <SelectItem value="biswa">Biswa</SelectItem>
                      <SelectItem value="guntha">Guntha</SelectItem>
                      <SelectItem value="aankadam">Aankadam</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="rood">Rood</SelectItem>
                      <SelectItem value="chataks">Chataks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Built-up Area */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="builtUpArea">Built-up Area*</Label>
                  <Input
                    id="builtUpArea"
                    placeholder="Enter built-up area"
                    value={formData.builtUpArea}
                    onChange={(e) => handleInputChange("builtUpArea", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Select value={formData.builtUpAreaUnit} onValueChange={(value) => handleInputChange("builtUpAreaUnit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perch">Perch</SelectItem>
                      <SelectItem value="sq_yard">Sq. Yard</SelectItem>
                      <SelectItem value="sq_meter">Sq. Meter</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="marla">Marla</SelectItem>
                      <SelectItem value="cents">Cents</SelectItem>
                      <SelectItem value="bigha">Bigha</SelectItem>
                      <SelectItem value="kottah">Kottah</SelectItem>
                      <SelectItem value="kanal">Kanal</SelectItem>
                      <SelectItem value="grounds">Grounds</SelectItem>
                      <SelectItem value="ares">Ares</SelectItem>
                      <SelectItem value="biswa">Biswa</SelectItem>
                      <SelectItem value="guntha">Guntha</SelectItem>
                      <SelectItem value="aankadam">Aankadam</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="rood">Rood</SelectItem>
                      <SelectItem value="chataks">Chataks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Furnishing Status */}
              <div className="space-y-2">
                <Label>Furnishing Status*</Label>
                <Select value={formData.furnished} onValueChange={(value) => handleInputChange("furnished", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                    <SelectItem value="furnished">Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Flooring */}
              <div className="space-y-2">
                <Label>Flooring*</Label>
                <Select value={formData.flooring} onValueChange={(value) => handleInputChange("flooring", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiles">Tiles</SelectItem>
                    <SelectItem value="marble">Marble</SelectItem>
                    <SelectItem value="wooden">Wooden</SelectItem>
                    <SelectItem value="granite">Granite</SelectItem>
                    <SelectItem value="concrete">Concrete</SelectItem>
                    <SelectItem value="ceramic">Ceramic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Boundary Wall */}
              <div className="space-y-2">
                <Label>Boundary Wall</Label>
                <RadioGroup
                  value={formData.boundaryWall}
                  onValueChange={(value) => handleInputChange("boundaryWall", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="boundary-yes" />
                    <Label htmlFor="boundary-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="boundary-no" />
                    <Label htmlFor="boundary-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Location Map URL */}
              <div className="space-y-2">
                <Label htmlFor="locationMapUrl">Location Map URL (Google Maps Embed URL)</Label>
                <Input
                  id="locationMapUrl"
                  placeholder="Enter Google Maps embed URL"
                  value={formData.locationMapUrl}
                  onChange={(e) => handleInputChange("locationMapUrl", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Go to Google Maps, click Share, select Embed map, and copy the URL from the iframe src attribute
                </p>
              </div>

              {/* Plot Area */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plotArea">Plot Area*</Label>
                  <Input
                    id="plotArea"
                    placeholder="Enter plot area"
                    value={formData.plotArea}
                    onChange={(e) => handleInputChange("plotArea", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Select value={formData.plotAreaUnit} onValueChange={(value) => handleInputChange("plotAreaUnit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perch">Perch</SelectItem>
                      <SelectItem value="sq_yard">Sq. Yard</SelectItem>
                      <SelectItem value="sq_meter">Sq. Meter</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="marla">Marla</SelectItem>
                      <SelectItem value="cents">Cents</SelectItem>
                      <SelectItem value="bigha">Bigha</SelectItem>
                      <SelectItem value="kottah">Kottah</SelectItem>
                      <SelectItem value="kanal">Kanal</SelectItem>
                      <SelectItem value="grounds">Grounds</SelectItem>
                      <SelectItem value="ares">Ares</SelectItem>
                      <SelectItem value="biswa">Biswa</SelectItem>
                      <SelectItem value="guntha">Guntha</SelectItem>
                      <SelectItem value="aankadam">Aankadam</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="rood">Rood</SelectItem>
                      <SelectItem value="chataks">Chataks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Plot Length & Width */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plotLength">Plot Length*</Label>
                  <Input
                    id="plotLength"
                    placeholder="Enter plot length"
                    value={formData.plotLength}
                    onChange={(e) => handleInputChange("plotLength", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plotWidth">Plot Width*</Label>
                  <Input
                    id="plotWidth"
                    placeholder="Enter plot width"
                    value={formData.plotWidth}
                    onChange={(e) => handleInputChange("plotWidth", e.target.value)}
                  />
                </div>
              </div>

              {/* Plot Facing */}
              <div className="space-y-2">
                <Label>Plot Facing*</Label>
                <Select value={formData.plotFacing} onValueChange={(value) => handleInputChange("plotFacing", value)}>
                  <SelectTrigger>
                    <SelectValue />
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

              {/* Plot Boundary Wall */}
              <div className="space-y-2">
                <Label>Plot Boundary Wall</Label>
                <RadioGroup
                  value={formData.plotBoundaryWall}
                  onValueChange={(value) => handleInputChange("plotBoundaryWall", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="plot-boundary-yes" />
                    <Label htmlFor="plot-boundary-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="plot-boundary-no" />
                    <Label htmlFor="plot-boundary-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* BHK */}
              <div className="space-y-2">
                <Label htmlFor="bhk">BHK*</Label>
                <Input
                  id="bhk"
                  placeholder="Enter BHK"
                  value={formData.bhk}
                  onChange={(e) => handleInputChange("bhk", e.target.value)}
                />
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