import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
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
  Send
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const values = [
    {
      icon: Shield,
      title: 'Excellence',
      description: 'We maintain the highest standards in every aspect of our work, delivering quality results consistently.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of industry trends, adopting cutting-edge tools and methodologies to serve you better.'
    },
    {
      icon: Heart,
      title: 'Partnership',
      description: 'Your success is our success. We work collaboratively to understand and exceed your expectations.'
    },
    {
      icon: Zap,
      title: 'Agility',
      description: 'We adapt quickly to changing requirements and deliver solutions that meet evolving business needs.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '200+', label: 'Happy Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '99.8%', label: 'Client Satisfaction' }
  ];

  const expertise = [
    'Enterprise Application Performance',
    'Cloud-Based Systems Testing',
    'E-commerce Platform Optimization',
    'API and Microservices Testing',
    'Mobile Application Performance',
    'Database Performance Tuning',
    'CI/CD Pipeline Integration',
    'Real-time System Analysis'
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@perfscale.com',
      link: 'mailto:contact@perfscale.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Tech Boulevard, San Francisco, CA 94105',
      link: null
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">About PerfScale</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Delivering world-class performance testing services since 2015
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  PerfScale is a leading performance testing consultancy dedicated to helping organizations 
                  deliver exceptional digital experiences. Founded in 2015, we've grown from a small team of 
                  performance engineers to a globally recognized firm serving Fortune 500 companies and 
                  innovative startups alike.
                </p>
                <p>
                  Our expertise spans across industries including finance, healthcare, e-commerce, and 
                  technology. We understand that every millisecond matters in today's digital landscape, 
                  and we're committed to ensuring your applications perform flawlessly under any condition.
                </p>
                <p>
                  With a team of certified performance engineers and a proven methodology, we've successfully 
                  tested thousands of applications, identifying critical bottlenecks and delivering actionable 
                  insights that drive measurable improvements in system performance and user satisfaction.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-2 hover:border-[#3b82f6] transition-colors">
                  <CardHeader>
                    <div className="text-4xl font-bold text-[#3b82f6] mb-2">
                      {stat.number}
                    </div>
                    <CardTitle className="text-sm text-gray-600 font-normal">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Target className="h-16 w-16 text-[#3b82f6] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Our Mission
              </h2>
            </div>
            
            <Card className="border-2 border-[#3b82f6] shadow-xl">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 leading-relaxed text-center">
                  To empower organizations with the insights and confidence needed to deliver high-performance 
                  applications that delight users, drive business growth, and withstand the demands of modern 
                  digital ecosystems. We achieve this through rigorous testing, expert analysis, and a 
                  relentless commitment to excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-[#3b82f6]" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Our Expertise
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We bring deep technical expertise across a wide range of technologies, platforms, and industries. 
                Our team stays current with the latest performance testing tools and best practices to deliver 
                cutting-edge solutions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-[#10b981] w-2 h-2 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-[#3b82f6]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Award className="h-8 w-8 text-[#3b82f6]" />
                    </div>
                    <div>
                      <CardTitle>Certified Professionals</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Our team holds industry-recognized certifications
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-[#10b981]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Users className="h-8 w-8 text-[#10b981]" />
                    </div>
                    <div>
                      <CardTitle>Experienced Team</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Average of 8+ years in performance engineering
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-[#f97316]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-[#f97316]" />
                    </div>
                    <div>
                      <CardTitle>Proven Track Record</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Consistent results and client satisfaction
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to optimize your application's performance? Let's discuss your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your performance testing needs..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white border-none">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                  <CardDescription className="text-blue-100">
                    We're here to help with all your performance testing needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-lg">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{info.title}</h4>
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

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-2 border-[#3b82f6]">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#1e3a8a]">Enterprise clients:</strong> For dedicated support and custom solutions, please mention "Enterprise" in your message for priority handling.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is the typical project timeline?',
                a: 'Most performance testing projects take 2-4 weeks, depending on the complexity and scope of your application.'
              },
              {
                q: 'Do you offer ongoing support?',
                a: 'Yes, we offer continuous performance monitoring and support packages tailored to your needs.'
              },
              {
                q: 'What industries do you serve?',
                a: 'We work with clients across all industries including finance, healthcare, e-commerce, SaaS, and more.'
              },
              {
                q: 'Can you test cloud-based applications?',
                a: 'Absolutely! We have extensive experience testing applications on AWS, Azure, GCP, and other cloud platforms.'
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
