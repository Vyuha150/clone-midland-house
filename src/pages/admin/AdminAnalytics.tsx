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
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Activity,
  Filter,
  RefreshCw,
  Download,
} from "lucide-react";
import { api } from "@/lib/api";

type AnalyticsOverview = {
  totalViews: number;
  totalLikes: number;
  totalInquiries: number;
  period: string;
};

type TopProperty = {
  propertyId: string;
  propertyName: string;
  location: string;
  price: number;
  views: number;
  uniqueUsers: number;
};

type DailyAnalytics = {
  _id: string;
  views: number;
  likes: number;
  inquiries: number;
};

type PropertyAnalytic = {
  _id: string;
  propertyId: string;
  userId?: string;
  viewType: string;
  ipAddress: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  property?: {
    propertyName: string;
    location: string;
    price: number;
  };
};

const AdminAnalytics = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [topProperties, setTopProperties] = useState<TopProperty[]>([]);
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyAnalytics[]>([]);
  const [propertyAnalytics, setPropertyAnalytics] = useState<
    PropertyAnalytic[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [selectedViewType, setSelectedViewType] = useState<string>("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        api(`/api/analytics/dashboard?days=${selectedPeriod}`),
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setOverview(data.overview);
      setTopProperties(data.topProperties || []);
      setDailyAnalytics(data.dailyAnalytics || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod]);

  const fetchAllAnalytics = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "50",
        days: selectedPeriod,
      });

      if (selectedViewType !== "all") {
        params.append("viewType", selectedViewType);
      }

      const response = await fetch(api(`/api/analytics/all?${params}`), {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPropertyAnalytics(data.analytics || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      console.error("Failed to fetch all analytics:", err);
    }
  }, [currentPage, selectedPeriod, selectedViewType]);

  const fetchPropertyAnalytics = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
      });

      if (selectedViewType !== "all") {
        params.append("viewType", selectedViewType);
      }

      const response = await fetch(
        api(`/api/analytics/property/${selectedProperty}?${params}`),
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPropertyAnalytics(data.analytics || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      console.error("Failed to fetch property analytics:", err);
    }
  }, [selectedProperty, selectedViewType, currentPage]);

  useEffect(() => {
    fetchDashboardData();
    fetchAllAnalytics();
  }, [fetchDashboardData, fetchAllAnalytics]);

  useEffect(() => {
    if (selectedProperty !== "all") {
      fetchPropertyAnalytics();
    } else {
      fetchAllAnalytics();
    }
  }, [
    selectedProperty,
    selectedViewType,
    currentPage,
    fetchPropertyAnalytics,
    fetchAllAnalytics,
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getViewTypeIcon = (viewType: string) => {
    switch (viewType) {
      case "view":
        return <Eye className="h-4 w-4" />;
      case "like":
        return <Heart className="h-4 w-4" />;
      case "inquiry":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getViewTypeColor = (
    viewType: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (viewType) {
      case "view":
        return "default";
      case "like":
        return "secondary";
      case "inquiry":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchDashboardData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Property Analytics</h1>
          <p className="text-muted-foreground">
            Track property views, engagement, and user interactions
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchDashboardData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overview.totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                in the last {overview.period}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overview.totalLikes.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                in the last {overview.period}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inquiries
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overview.totalInquiries.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                in the last {overview.period}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Top Viewed Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topProperties.length > 0 ? (
            <div className="space-y-4">
              {topProperties.map((property, index) => (
                <div
                  key={property.propertyId}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{property.propertyName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location} • {formatPrice(property.price)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm font-medium">
                      <Eye className="h-4 w-4 mr-1" />
                      {property.views} views
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {property.uniqueUsers} unique users
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No property data available for the selected period.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              All Property Analytics
            </div>
            <div className="text-sm font-normal text-muted-foreground">
              {propertyAnalytics.length > 0 &&
                `${propertyAnalytics.length} records`}
            </div>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Select
                value={selectedProperty}
                onValueChange={setSelectedProperty}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  {topProperties.map((property) => (
                    <SelectItem
                      key={property.propertyId}
                      value={property.propertyId}
                    >
                      {property.propertyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedViewType}
                onValueChange={setSelectedViewType}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="View type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="view">Views</SelectItem>
                  <SelectItem value="like">Likes</SelectItem>
                  <SelectItem value="inquiry">Inquiries</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setCurrentPage(1);
                  if (selectedProperty !== "all") {
                    fetchPropertyAnalytics();
                  } else {
                    fetchAllAnalytics();
                  }
                }}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <Button
                onClick={() => {
                  setSelectedProperty("all");
                  setSelectedViewType("all");
                  setCurrentPage(1);
                }}
                variant="outline"
                size="sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              {selectedProperty === "all"
                ? "all properties"
                : "specific property"}{" "}
              •
              {selectedViewType === "all"
                ? " all interaction types"
                : ` ${selectedViewType} only`}{" "}
              • last {selectedPeriod} days
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {propertyAnalytics.length > 0 ? (
            <div className="space-y-4">
              {propertyAnalytics.map((analytic) => (
                <div
                  key={analytic._id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {getViewTypeIcon(analytic.viewType)}
                      <Badge
                        variant={getViewTypeColor(analytic.viewType)}
                        className="ml-2 capitalize"
                      >
                        {analytic.viewType}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">
                        {analytic.user?.name || "Anonymous User"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {analytic.user?.email || `IP: ${analytic.ipAddress}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatDate(analytic.createdAt)}
                    </p>
                    {analytic.property && (
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium">
                          {analytic.property.propertyName}
                        </p>
                        <p className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {analytic.property.location}
                        </p>
                        <p>{formatPrice(analytic.property.price)}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              {loading
                ? "Loading analytics data..."
                : "No analytics data available for the selected criteria."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
