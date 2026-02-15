import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Account = {
  name?: string;
  email: string;
  role: "user" | "admin";
};

export function NavBar() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const syncAuth = () => {
      const stored = localStorage.getItem("account");
      setAccount(stored ? JSON.parse(stored) : null);
    };

    syncAuth();
    window.addEventListener("auth-change", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    localStorage.removeItem("role");
    setAccount(null);
    navigate("/login");
  };

  return (
    {/* <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#0f2f7a] text-white shadow-md"> */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-[#0f2f7a] text-white shadow-md">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white">
        PerfScale
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-sm font-medium">

        <Link to="/" className="hover:text-blue-300 transition">
          Home
        </Link>

        <Link to="/services" className="hover:text-blue-300 transition">
          Capabilities
        </Link>

        <Link to="/about" className="hover:text-blue-300 transition">
          About
        </Link>

        <Link to="/blog" className="hover:text-blue-300 transition">
          Resources
        </Link>

        <Link to="/posts" className="hover:text-blue-300 transition">
          Blog
        </Link>

        {/* Auth Section */}
        {!account ? (
          <>
            <Link to="/login" className="hover:text-blue-300">
              Login
            </Link>

            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">

            <span className="text-blue-200">
              {account.role === "admin"
                ? "Admin"
                : `Hello, ${account.name}`}
            </span>

            {/* Admin Only Links */}
            {account.role === "admin" && (
              <>
                <Link to="/admin">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0f2f7a]">
                    Dashboard
                  </Button>
                </Link>

                <Link to="/admin/posts/new">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    New Post
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-white text-white hover:bg-white hover:text-[#0f2f7a]"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

