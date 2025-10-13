import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  Eye,
  Star,
  Home,
  Car,
  Wifi,
  Zap,
  Droplets,
  Shield,
  TreePine,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Share2,
  Heart,
  Camera,
  X,
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
  dimensionsLength?: string;
  dimensionsWidth?: string;
  dimensionsUnit?: string;
  carpetArea?: string;
  carpetAreaUnit?: string;
  builtUpArea?: string;
  builtUpAreaUnit?: string;
  furnished?: string;
  flooring?: string;
  boundaryWall?: string;
  locationMapUrl?: string;
  plotArea?: string;
  plotAreaUnit?: string;
  plotLength?: string;
  plotWidth?: string;
  plotFacing?: string;
  plotBoundaryWall?: string;
  bhk?: string;
  facing?: string;
  amenities?: string[];
  images?: string[];
  virtualTour?: string;
  description?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  availableFrom?: string;
  userId: {
    name?: string;
    email?: string;
  };
  status: string;
  featured: boolean;
  views: number;
  createdAt: string;
};

const PropertyView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const trackPropertyView = useCallback(async (propertyId: string) => {
    try {
      const sessionId =
        sessionStorage.getItem("sessionId") ||
        Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      if (!sessionStorage.getItem("sessionId")) {
        sessionStorage.setItem("sessionId", sessionId);
      }

      await fetch(api("/api/analytics/track"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId,
          viewType: "view",
          referrer: document.referrer,
          sessionId,
        }),
      });
    } catch (err) {
      console.log("Failed to track property view:", err);
      // Don't throw error as this shouldn't block property viewing
    }
  }, []);

  const handleLike = useCallback(async () => {
    if (!id || likeLoading) return;

    try {
      setLikeLoading(true);
      const sessionId =
        sessionStorage.getItem("sessionId") ||
        Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      await fetch(api("/api/analytics/track"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId: id,
          viewType: "like",
          sessionId,
        }),
      });

      setIsLiked(!isLiked);
    } catch (err) {
      console.log("Failed to track property like:", err);
    } finally {
      setLikeLoading(false);
    }
  }, [id, isLiked, likeLoading]);

  const fetchProperty = useCallback(async () => {
    if (!id) {
      setError("Property ID is required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(api(`/api/properties/${id}`), {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Property not found");
        }
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setProperty(data.property);

      // Track the property view
      trackPropertyView(id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to fetch property");
    } finally {
      setLoading(false);
    }
  }, [id, trackPropertyView]);

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

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes("parking") || amenityLower.includes("garage"))
      return <Car className="h-4 w-4" />;
    if (amenityLower.includes("wifi") || amenityLower.includes("internet"))
      return <Wifi className="h-4 w-4" />;
    if (amenityLower.includes("power") || amenityLower.includes("electricity"))
      return <Zap className="h-4 w-4" />;
    if (amenityLower.includes("water")) return <Droplets className="h-4 w-4" />;
    if (amenityLower.includes("security"))
      return <Shield className="h-4 w-4" />;
    if (amenityLower.includes("garden") || amenityLower.includes("park"))
      return <TreePine className="h-4 w-4" />;
    if (amenityLower.includes("gym") || amenityLower.includes("fitness"))
      return <Dumbbell className="h-4 w-4" />;
    return <Home className="h-4 w-4" />;
  };

  const nextImage = () => {
    if (property?.images && property.images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % property.images!.length);
    }
  };

  const prevImage = () => {
    if (property?.images && property.images.length > 0) {
      setSelectedImageIndex(
        (prev) => (prev - 1 + property.images!.length) % property.images!.length
      );
    }
  };

  const openCarousel = (index: number) => {
    setSelectedImageIndex(index);
    setCarouselOpen(true);
  };

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested property could not be found.
          </p>
          <Button onClick={() => navigate("/buy")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              disabled={likeLoading}
              className={isLiked ? "text-red-500 border-red-500" : ""}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {likeLoading ? "..." : isLiked ? "Liked" : "Like"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative mb-4">
              {property.images && property.images.length > 0 ? (
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={api(property.images[selectedImageIndex])}
                    alt={property.propertyName}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openCarousel(selectedImageIndex)}
                  />

                  {/* Image Navigation */}
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    <Camera className="h-3 w-3 inline mr-1" />
                    {selectedImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Property Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="capitalize">For {property.purpose}</Badge>
                    {property.featured && (
                      <Badge variant="secondary" className="text-yellow-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-lg font-bold">
                      {formatPrice(property.price, property.purpose)}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-2" />
                    <p>No images available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {property.images && property.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 hover:scale-105 ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={api(image)}
                      alt={`${property.propertyName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Property Description */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                {property.description ? (
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {property.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No description available.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Virtual Tour */}
            {property.virtualTour && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Virtual Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <a
                      href={property.virtualTour}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Take Virtual Tour
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Property Details */}
          <div className="lg:col-span-1">
            {/* Property Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {property.propertyName}
                </CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price and Views */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(property.price, property.purpose)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Eye className="h-3 w-3 inline mr-1" />
                      {property.views} views
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Property Type and Category */}
                <div className="flex gap-2">
                  <Badge variant="outline" className="capitalize">
                    {property.propertyType}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {property.propertyCategory}
                  </Badge>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {property.bedrooms} Bedrooms
                      </span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {property.bathrooms} Bathrooms
                      </span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {property.area} {property.areaUnit}
                      </span>
                    </div>
                  )}
                  {property.bhk && (
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{property.bhk} BHK</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Owner Contact */}
                <div>
                  <h4 className="font-semibold mb-3">Contact Owner</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{property.ownerName}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={`tel:${property.ownerPhone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {property.ownerPhone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={`mailto:${property.ownerEmail}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {property.ownerEmail}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button className="w-full" asChild>
                      <a href={`tel:${property.ownerPhone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Owner
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={`mailto:${property.ownerEmail}?subject=Inquiry about ${property.propertyName}&body=Hi ${property.ownerName},%0D%0A%0D%0AI am interested in your property "${property.propertyName}" listed for ${property.purpose}. Could you please provide more details?`}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Owner
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Availability */}
                {property.availableFrom && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Availability</h4>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          Available from{" "}
                          {new Date(
                            property.availableFrom
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {property.furnished && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Furnished</span>
                    <span className="capitalize">{property.furnished}</span>
                  </div>
                )}
                {property.facing && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Facing</span>
                    <span className="capitalize">{property.facing}</span>
                  </div>
                )}
                {property.flooring && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flooring</span>
                    <span className="capitalize">{property.flooring}</span>
                  </div>
                )}
                {property.carpetArea && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carpet Area</span>
                    <span>
                      {property.carpetArea} {property.carpetAreaUnit}
                    </span>
                  </div>
                )}
                {property.builtUpArea && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Built-up Area</span>
                    <span>
                      {property.builtUpArea} {property.builtUpAreaUnit}
                    </span>
                  </div>
                )}
                {property.plotArea && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plot Area</span>
                    <span>
                      {property.plotArea} {property.plotAreaUnit}
                    </span>
                  </div>
                )}
                {property.dimensionsLength && property.dimensionsWidth && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>
                      {property.dimensionsLength} x {property.dimensionsWidth}{" "}
                      {property.dimensionsUnit}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed</span>
                  <span>
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        {getAmenityIcon(amenity)}
                        <span className="ml-2 text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location Map */}
            {property.locationMapUrl && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={property.locationMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Image Carousel Dialog */}
      <Dialog open={carouselOpen} onOpenChange={setCarouselOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{property.propertyName} - Images</DialogTitle>
          </DialogHeader>

          {property.images && property.images.length > 0 && (
            <div className="relative">
              <div className="aspect-video relative">
                <img
                  src={api(property.images[selectedImageIndex])}
                  alt={`${property.propertyName} ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Navigation */}
                {property.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Close button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => setCarouselOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                  {selectedImageIndex + 1} of {property.images.length}
                </div>
              </div>

              {/* Thumbnail navigation */}
              <div className="p-4">
                <div className="flex justify-center gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "border-primary"
                          : "border-transparent hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={api(image)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyView;
