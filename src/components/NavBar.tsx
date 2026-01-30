import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type User = {
  name: string;
  email: string;
};

export function NavBar() {
  const [user, setUser] = useState<User | null>(null);

  // 🔄 Sync user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // 🔥 forces re-render
    navigate("/");
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b">
      <Link to="/" className="text-xl font-bold text-blue-700">
        PerfScale
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
         <Link to="/blog">Blog</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">
              <Button className="bg-blue-600 text-white">Sign Up</Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">
              Hello, {user.name}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
