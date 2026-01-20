import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Activity } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
export function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Signup failed');
        return;
      }

      toast.success('Account created successfully!');
      setFormData({
        name: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: ''
      });

    } catch {
      toast.error('Server error. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="bg-white p-3 rounded-lg">
              <Activity className="h-8 w-8 text-[#1e3a8a]" />
            </div>
            <span className="text-3xl font-bold text-white">PerfScale</span>
          </Link>
          <p className="text-blue-100 mt-2">Create your account to get started.</p>
        </div>

        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <Label>Company</Label>
                <Input name="company" value={formData.company} onChange={handleChange} />
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>

              <div>
                <Label>Confirm Password</Label>
                <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>

              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-[#3b82f6] font-medium">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
