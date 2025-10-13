import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Youtube, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import useAuth from "@/context/useAuth";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim() || !email.trim() || !name.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        subject: subject.trim(),
        message: message.trim(),
        email: email.trim(),
        name: name.trim(),
      };

      const response = await fetch(api("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Session expired - suggest logout/login
          throw new Error(
            data.message ||
              "Your session has expired. Please sign out and sign back in."
          );
        }
        throw new Error(data.message || "Failed to send feedback");
      }

      toast({
        title: "Feedback Sent",
        description: "Thank you for your feedback. We'll get back to you soon!",
      });

      // Reset form
      setSubject("");
      setMessage("");
      setEmail("");
      setName("");
    } catch (error: unknown) {
      console.error("Submit error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send feedback. Please try again.";
      toast({
        title: "Submission Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Us Section */}
          <Card className="bg-primary text-primary-foreground p-8">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>

            <p className="text-lg mb-8 leading-relaxed">
              We provide all types of professional real estate services for our
              customers. Get your customized solutions at Our office: Lohithya
              Towers, Nirmala Convent road, Vijayawada 520010.
            </p>

            {/* Office Location */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">Office Location</h3>
                </div>
                <div className="text-lg leading-relaxed ml-8">
                  <p>Lohithya Towers,</p>
                  <p>Nirmala Convent road,</p>
                  <p>Vijayawada 520010</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <a
                  href="mailto:admin@midlandrealestateservices.com"
                  className="text-lg hover:underline"
                >
                  admin@midlandrealestateservices.com
                </a>
              </div>

              {/* YouTube */}
              <div className="flex items-center space-x-3">
                <Youtube className="h-5 w-5" />
                <a
                  href="https://www.youtube.com/@midlandrealestateinvijayawada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:underline"
                >
                  Follow us on YouTube
                </a>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send us a Feedback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email fields - always shown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Subject *
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Sending..." : "Send Feedback"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
