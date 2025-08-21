import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, Edit, Trash2, Plus, Users, Home, MessageSquare, Settings, 
  TrendingUp, BarChart3, PieChart, Activity, DollarSign, 
  Calendar, Bell, Filter, Download, Star, Award
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Total Properties", value: "1,234", icon: Home, change: "+12%", trend: "up" },
    { title: "Active Users", value: "8,945", icon: Users, change: "+5%", trend: "up" },
    { title: "Messages", value: "156", icon: MessageSquare, change: "+23%", trend: "up" },
    { title: "Revenue", value: "$124,500", icon: DollarSign, change: "+8%", trend: "up" },
    { title: "Property Views", value: "45,678", icon: Activity, change: "+15%", trend: "up" },
    { title: "Inquiries", value: "892", icon: Bell, change: "+18%", trend: "up" },
    { title: "Featured Listings", value: "67", icon: Star, change: "+3%", trend: "up" },
    { title: "Premium Members", value: "234", icon: Award, change: "+9%", trend: "up" },
  ];

  const analyticsData = [
    { name: "Property Views", value: 45678, percentage: 85 },
    { name: "User Registrations", value: 8945, percentage: 72 },
    { name: "Inquiries Received", value: 892, percentage: 60 },
    { name: "Properties Sold", value: 234, percentage: 45 },
  ];

  const recentProperties = [
    { id: 1, title: "Luxury Villa in Beverly Hills", type: "Villa", status: "Active", price: "$2,500,000" },
    { id: 2, title: "Modern Apartment Downtown", type: "Apartment", status: "Pending", price: "$850,000" },
    { id: 3, title: "Family House Suburbs", type: "House", status: "Active", price: "$650,000" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Buyer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Seller", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Agent", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive real estate platform management</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 animate-fade-in">
            <TabsTrigger value="overview" className="transition-all duration-200 hover:scale-105">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="transition-all duration-200 hover:scale-105">Analytics</TabsTrigger>
            <TabsTrigger value="properties" className="transition-all duration-200 hover:scale-105">Properties</TabsTrigger>
            <TabsTrigger value="users" className="transition-all duration-200 hover:scale-105">Users</TabsTrigger>
            <TabsTrigger value="messages" className="transition-all duration-200 hover:scale-105">Messages</TabsTrigger>
            <TabsTrigger value="settings" className="transition-all duration-200 hover:scale-105">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" 
                        style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                        <span className="text-green-600">{stat.change}</span> from last month
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
                  <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Platform Analytics</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Analytics Cards */}
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
                        <span className="font-medium">{item.value.toLocaleString()}</span>
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
          </TabsContent>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProperties.map((property, index) => (
                    <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200" 
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-muted-foreground">{property.type} • {property.price}</p>
                      </div>
                      <Badge variant={property.status === "Active" ? "default" : "secondary"}>
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
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200" 
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email} • {user.role}</p>
                      </div>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Properties Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-muted-foreground">{property.type} • {property.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Users Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email} • {user.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold">Messages & Inquiries</h2>
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recent messages to display.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="Mid-Land Real Estate Services" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea id="site-description" defaultValue="Your trusted real estate partner" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@midlandrealestateservices.com" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;