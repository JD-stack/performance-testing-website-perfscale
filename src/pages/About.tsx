import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Award,
  Users,
  Target,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
  Zap,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

const API_URL = import.meta.env.VITE_API_URL;

export function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  /* ================= SUBMIT TO BACKEND ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send message");
        return;
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error("Server unreachable. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@perfscale.com",
      link: "mailto:contact@perfscale.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Office",
      content: "123 Tech Boulevard, San Francisco, CA 94105",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-white">
            About PerfScale
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Delivering world-class performance testing services since 2015
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Send us a message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Company</Label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label>Phone</Label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Message *</Label>
                      <Textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1e3a8a] hover:bg-[#1e40af]"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white border-none">
                <CardHeader>
                  <CardTitle className="text-white">
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    We're here to help
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="bg-white/10 p-3 rounded-lg">
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link}>{info.content}</a>
                        ) : (
                          <p>{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
