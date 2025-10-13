import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dialog";
import { Eye, Mail, Search, RefreshCw, Filter } from "lucide-react";
import { api } from "@/lib/api";
import useAuth from "@/context/useAuth";

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

const AdminMessages = () => {
  const { user } = useAuth();
  const [contactsList, setContactsList] = useState<ContactItem[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactItem[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Dialog states
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    if (!user || user.role !== "admin") return;

    setContactsLoading(true);
    setContactsError(null);
    try {
      const res = await fetch(api("/api/contact"), { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setContactsList(data.contacts || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setContactsError(message || "Failed to fetch contacts");
    } finally {
      setContactsLoading(false);
    }
  }, [user]);

  // Filter contacts
  useEffect(() => {
    let filtered = contactsList;

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.userId?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contact.userId?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (contact) => contact.priority === priorityFilter
      );
    }

    setFilteredContacts(filtered);
  }, [contactsList, searchTerm, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleViewContact = (contact: ContactItem) => {
    setSelectedContact(contact);
    setViewDialogOpen(true);
  };

  const getContactEmail = (contact: ContactItem) => {
    return contact.userId?.email || contact.email || "";
  };

  const getContactName = (contact: ContactItem) => {
    return contact.userId?.name || contact.name || "Anonymous";
  };

  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case "new":
        return "default";
      case "read":
        return "secondary";
      case "replied":
        return "outline";
      case "closed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPriorityBadgeVariant = (priority?: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Messages & Inquiries
          </h1>
          <p className="text-muted-foreground">
            Manage customer messages and feedback
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchContacts}
          disabled={contactsLoading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${contactsLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search messages by subject, content, or sender..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full lg:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full lg:w-48">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {contactsLoading ? (
            <p className="text-muted-foreground text-center py-8">
              Loading messages...
            </p>
          ) : contactsError ? (
            <p className="text-red-500 text-center py-8">
              Error: {contactsError}
            </p>
          ) : filteredContacts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                ? "No messages match your filters."
                : "No messages to display."}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{contact.subject}</h4>
                      <Badge variant={getStatusBadgeVariant(contact.status)}>
                        {contact.status}
                      </Badge>
                      <Badge
                        variant={getPriorityBadgeVariant(contact.priority)}
                      >
                        {contact.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      From: {getContactName(contact)} (
                      {getContactEmail(contact) || "No email"})
                    </p>
                    <p className="text-sm line-clamp-2 mb-2">
                      {contact.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewContact(contact)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {getContactEmail(contact) && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`mailto:${getContactEmail(
                            contact
                          )}?subject=Re: ${
                            contact.subject || "Your inquiry"
                          }&body=Hello ${getContactName(
                            contact
                          )},%0D%0A%0D%0AThank you for contacting us. `}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Contact Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    From
                  </Label>
                  <p className="text-sm font-medium">
                    {getContactName(selectedContact)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Email
                  </Label>
                  <p className="text-sm">
                    {getContactEmail(selectedContact) || "No email provided"}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Subject
                </Label>
                <p className="text-sm font-medium">{selectedContact.subject}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Status
                  </Label>
                  <Badge
                    variant={getStatusBadgeVariant(selectedContact.status)}
                    className="ml-2"
                  >
                    {selectedContact.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Priority
                  </Label>
                  <Badge
                    variant={getPriorityBadgeVariant(selectedContact.priority)}
                    className="ml-2"
                  >
                    {selectedContact.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Date
                </Label>
                <p className="text-sm">
                  {selectedContact.createdAt
                    ? new Date(selectedContact.createdAt).toLocaleString()
                    : "No date"}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Message
                </Label>
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {getContactEmail(selectedContact) && (
                <div className="flex justify-end pt-4 border-t">
                  <Button asChild>
                    <a
                      href={`mailto:${getContactEmail(
                        selectedContact
                      )}?subject=Re: ${
                        selectedContact.subject || "Your inquiry"
                      }&body=Hello ${getContactName(
                        selectedContact
                      )},%0D%0A%0D%0AThank you for contacting us. `}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
