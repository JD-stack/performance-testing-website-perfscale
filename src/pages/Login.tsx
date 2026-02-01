import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Activity } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      // ✅ supports both user & admin
      const account = data.user || data.admin;

      if (!account || !data.token) {
        toast.error('Invalid login response');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('account', JSON.stringify(account));
      localStorage.setItem('role', account.role);
      window.dispatchEvent(new Event("auth-change"));
      toast.success('Login successful!');

      // ✅ role-based redirect
      if (account.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch {
      toast.error('Server error. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          <p className="text-blue-100 mt-2">Welcome back!</p>
        </div>

        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don’t have an account? </span>
              <Link to="/signup" className="text-[#3b82f6] font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

