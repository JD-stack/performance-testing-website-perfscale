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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About PerfScale
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Delivering world-class performance engineering solutions
            since 2015. Built for scale. Designed for reliability.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* FORM */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border border-gray-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-[#1e3a8a]">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    We respond within 24 hours.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name + Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2"
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
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    {/* Company + Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Company</Label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Phone</Label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label>Message *</Label>
                      <Textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-6 text-lg rounded-xl transition-all duration-300"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </div>

            {/* CONTACT INFO */}
            <div>
              <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white border-none shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    We’re here to help
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <info.icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-blue-100 hover:text-white transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-blue-100">{info.content}</p>
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
