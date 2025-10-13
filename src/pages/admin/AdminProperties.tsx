import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Home,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";

import { api } from "@/lib/api";
import useAuth from "@/context/useAuth";

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
  furnished?: string;
  amenities?: string[];
  images?: string[];
  description?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  userId: {
    name?: string;
    email?: string;
  };
  status: "pending" | "approved" | "rejected" | "sold" | "rented";
  featured: boolean;
  views: number;
  createdAt: string;
};

const AdminProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [purposeFilter, setPurposeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    featured: 0,
  });

  const fetchProperties = useCallback(async () => {
    if (!user || user.role !== "admin") return;

    setLoading(true);
    setError(null);

    try {
      // Fetch all properties using admin endpoint
      const res = await fetch(api("/api/properties/admin/all"), {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      const data = await res.json();
      const allProperties = data.properties || [];

      setProperties(allProperties);

      // Calculate stats
      const newStats = {
        total: allProperties.length,
        pending: allProperties.filter((p: Property) => p.status === "pending")
          .length,
        approved: allProperties.filter((p: Property) => p.status === "approved")
          .length,
        rejected: allProperties.filter((p: Property) => p.status === "rejected")
          .length,
        featured: allProperties.filter((p: Property) => p.featured).length,
      };
      setStats(newStats);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updatePropertyStatus = async (
    propertyId: string,
    newStatus: string
  ) => {
    try {
      const res = await fetch(api(`/api/properties/${propertyId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update property status");

      // Refresh properties list
      fetchProperties();
    } catch (err) {
      console.error("Error updating property status:", err);
    }
  };

  const toggleFeatured = async (propertyId: string, featured: boolean) => {
    try {
      const res = await fetch(api(`/api/properties/${propertyId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ featured: !featured }),
      });

      if (!res.ok) throw new Error("Failed to toggle featured status");

      // Refresh properties list
      fetchProperties();
    } catch (err) {
      console.error("Error toggling featured status:", err);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      const res = await fetch(api(`/api/properties/${propertyId}`), {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete property");

      // Refresh properties list
      fetchProperties();
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setViewDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "sold":
        return "outline";
      case "rented":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-3 w-3" />;
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "rejected":
        return <XCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || property.status === statusFilter;
    const matchesPurpose =
      purposeFilter === "all" || property.purpose === purposeFilter;
    const matchesType =
      typeFilter === "all" || property.propertyType === typeFilter;

    return matchesSearch && matchesStatus && matchesPurpose && matchesType;
  });

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Access denied. Admin privileges required.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Properties Management
          </h1>
          <p className="text-muted-foreground">
            Manage property listings, approvals, and real estate data
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchProperties}>
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.featured}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>

            <Select value={purposeFilter} onValueChange={setPurposeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purpose</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="lease">For Lease</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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
        </CardContent>
      </Card>

      {/* Properties List */}
      <Card>
        <CardHeader>
          <CardTitle>Properties ({filteredProperties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-center py-8">
              Loading properties...
            </p>
          ) : error ? (
            <p className="text-red-500 text-center py-8">Error: {error}</p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No properties found matching your criteria.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {property.images && property.images.length > 0 && (
                        <img
                          src={api(property.images[0])}
                          alt={property.propertyName}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">
                            {property.propertyName}
                          </h4>
                          {property.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {property.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {formatPrice(property.price)}
                          </span>
                          {property.bedrooms && (
                            <span className="flex items-center gap-1">
                              <Bed className="h-3 w-3" />
                              {property.bedrooms}
                            </span>
                          )}
                          {property.bathrooms && (
                            <span className="flex items-center gap-1">
                              <Bath className="h-3 w-3" />
                              {property.bathrooms}
                            </span>
                          )}
                          {property.area && (
                            <span className="flex items-center gap-1">
                              <Square className="h-3 w-3" />
                              {property.area} {property.areaUnit}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {property.views} views
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={getStatusBadgeVariant(property.status)}
                          >
                            {getStatusIcon(property.status)}
                            <span className="ml-1 capitalize">
                              {property.status}
                            </span>
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {property.purpose}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {property.propertyType}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Owner: {property.ownerName} • {property.ownerPhone} •{" "}
                          {property.ownerEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Listed:{" "}
                          {new Date(property.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProperty(property)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {property.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updatePropertyStatus(property._id, "approved")
                            }
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updatePropertyStatus(property._id, "rejected")
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toggleFeatured(property._id, property.featured)
                        }
                        className={property.featured ? "text-yellow-600" : ""}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            property.featured ? "fill-current" : ""
                          }`}
                        />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Property</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "
                              {property.propertyName}"? This action cannot be
                              undone and will permanently remove the property
                              and all its data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProperty(property._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Property
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Property View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-6">
              {/* Property Images */}
              {selectedProperty.images &&
                selectedProperty.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProperty.images.map((image, index) => (
                      <img
                        key={index}
                        src={api(image)}
                        alt={`${selectedProperty.propertyName} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Name:</strong> {selectedProperty.propertyName}
                    </div>
                    <div>
                      <strong>Purpose:</strong>{" "}
                      <span className="capitalize">
                        {selectedProperty.purpose}
                      </span>
                    </div>
                    <div>
                      <strong>Price:</strong>{" "}
                      {formatPrice(selectedProperty.price)}
                    </div>
                    <div>
                      <strong>Type:</strong>{" "}
                      <span className="capitalize">
                        {selectedProperty.propertyType}
                      </span>
                    </div>
                    <div>
                      <strong>Category:</strong>{" "}
                      <span className="capitalize">
                        {selectedProperty.propertyCategory}
                      </span>
                    </div>
                    <div>
                      <strong>Location:</strong> {selectedProperty.location}
                    </div>
                    <div>
                      <strong>Status:</strong>{" "}
                      <span className="capitalize">
                        {selectedProperty.status}
                      </span>
                    </div>
                    <div>
                      <strong>Featured:</strong>{" "}
                      {selectedProperty.featured ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Views:</strong> {selectedProperty.views}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Property Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    {selectedProperty.bedrooms && (
                      <div>
                        <strong>Bedrooms:</strong> {selectedProperty.bedrooms}
                      </div>
                    )}
                    {selectedProperty.bathrooms && (
                      <div>
                        <strong>Bathrooms:</strong> {selectedProperty.bathrooms}
                      </div>
                    )}
                    {selectedProperty.area && (
                      <div>
                        <strong>Area:</strong> {selectedProperty.area}{" "}
                        {selectedProperty.areaUnit}
                      </div>
                    )}
                    {selectedProperty.furnished && (
                      <div>
                        <strong>Furnished:</strong>{" "}
                        <span className="capitalize">
                          {selectedProperty.furnished}
                        </span>
                      </div>
                    )}
                    <div>
                      <strong>Listed:</strong>{" "}
                      {new Date(
                        selectedProperty.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Owner Information
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Name:</strong> {selectedProperty.ownerName}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedProperty.ownerPhone}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedProperty.ownerEmail}
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {selectedProperty.amenities &&
                selectedProperty.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {/* Description */}
              {selectedProperty.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedProperty.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProperties;
