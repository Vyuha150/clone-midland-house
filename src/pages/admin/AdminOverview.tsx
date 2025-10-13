import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Users,
  Home,
  MessageSquare,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Calendar,
  Bell,
  Download,
  Star,
  Award,
} from "lucide-react";
import { api } from "@/lib/api";
import useAuth from "@/context/useAuth";

type UserItem = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
};

type ContactItem = {
  _id?: string;
  subject?: string;
  message?: string;
  email?: string;
  name?: string;
  status?: string;
  priority?: string;
  createdAt?: string;
  userId?: { name?: string; email?: string };
};

const AdminOverview = () => {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [contactsList, setContactsList] = useState<ContactItem[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [contactsLoading, setContactsLoading] = useState(false);

  // Fetch users for overview stats
  const fetchUsers = useCallback(async () => {
    if (!user || user.role !== "admin") return;

    setUsersLoading(true);
    try {
      const res = await fetch(api("/api/users"), { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setUsersList(data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setUsersLoading(false);
    }
  }, [user]);

  // Fetch contacts for overview stats
  const fetchContacts = useCallback(async () => {
    if (!user || user.role !== "admin") return;

    setContactsLoading(true);
    try {
      const res = await fetch(api("/api/contact"), { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setContactsList(data.contacts || []);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setContactsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUsers();
    fetchContacts();
  }, [fetchUsers, fetchContacts]);

  const stats = [
    {
      title: "Total Properties",
      value: "1,234",
      icon: Home,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Users",
      value: usersList.length.toString(),
      icon: Users,
      change: "+5%",
      trend: "up",
    },
    {
      title: "Messages",
      value: contactsList.length.toString(),
      icon: MessageSquare,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$124,500",
      icon: DollarSign,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Property Views",
      value: "45,678",
      icon: Activity,
      change: "+15%",
      trend: "up",
    },
    {
      title: "Inquiries",
      value: "892",
      icon: Bell,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Featured Listings",
      value: "67",
      icon: Star,
      change: "+3%",
      trend: "up",
    },
    {
      title: "Premium Members",
      value: "234",
      icon: Award,
      change: "+9%",
      trend: "up",
    },
  ];

  const analyticsData = [
    { name: "Property Views", value: 45678, percentage: 85 },
    { name: "User Registrations", value: 8945, percentage: 72 },
    { name: "Inquiries Received", value: 892, percentage: 60 },
    { name: "Properties Sold", value: 234, percentage: 45 },
  ];

  const recentProperties = [
    {
      id: 1,
      title: "Luxury Villa in Beverly Hills",
      type: "Villa",
      status: "Active",
      price: "$2,500,000",
    },
    {
      id: 2,
      title: "Modern Apartment Downtown",
      type: "Apartment",
      status: "Pending",
      price: "$850,000",
    },
    {
      id: 3,
      title: "Family House Suburbs",
      type: "House",
      status: "Active",
      price: "$650,000",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Comprehensive real estate platform management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="hover:scale-105 transition-transform duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Bell className="h-4 w-4 mr-2" />
              Send Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">
                    {item.value.toLocaleString()}
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Property Sales</span>
                <span className="font-bold text-green-600">$89,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Premium Memberships</span>
                <span className="font-bold text-blue-600">$23,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Featured Listings</span>
                <span className="font-bold text-purple-600">$11,600</span>
              </div>
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Revenue</span>
                  <span className="text-primary">$124,500</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div>
                    <p className="font-medium">{property.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.type} • {property.price}
                    </p>
                  </div>
                  <Badge
                    variant={
                      property.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <p className="text-muted-foreground">Loading users...</p>
            ) : usersList.length === 0 ? (
              <p className="text-muted-foreground">No users found</p>
            ) : (
              <div className="space-y-4">
                {usersList.slice(0, 3).map((user, index) => (
                  <div
                    key={user._id || user.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <p className="font-medium">{user.name || "Unknown"}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email || "No email"} • {user.role || "user"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        user.role === "admin" ? "destructive" : "default"
                      }
                    >
                      {user.role || "user"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
