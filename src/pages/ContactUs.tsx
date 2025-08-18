import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Youtube, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Feedback Sent",
      description: "Thank you for your feedback. We'll get back to you soon!",
    });

    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Us Section */}
          <Card className="bg-primary text-primary-foreground p-8">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            
            <p className="text-lg mb-8 leading-relaxed">
              We provide all types of professional real estate services for our customers. Get your customized solutions at Our office: Lohithya Towers, Nirmala Convent road, Vijayawada 520010.
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
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
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
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
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;