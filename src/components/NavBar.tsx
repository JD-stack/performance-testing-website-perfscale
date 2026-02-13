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

  syncAuth(); // initial load

  window.addEventListener("auth-change", syncAuth);
  window.addEventListener("storage", syncAuth);

  return () => {
    window.removeEventListener("auth-change", syncAuth);
    window.removeEventListener("storage", syncAuth);
  };
}, []);

  // 🔄 Sync auth state from localStorage
//  useEffect(() => {
   // const storedAccount = localStorage.getItem("account");
    //if (storedAccount) {
      //setAccount(JSON.parse(storedAccount));
    //}
  //}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    localStorage.removeItem("role");
    setAccount(null);
    navigate("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b">
      <Link to="/" className="text-xl font-bold text-blue-700">
        PerfScale
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/services">Capabilities</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Resources</Link>
        {!account ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">
              <Button className="bg-blue-600 text-white">Sign Up</Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">
              {account.role === "admin"
                ? "Admin"
                : `Hello, ${account.name}`}
            </span>

            {account.role === "admin" && (
              <Link to="/admin">
                <Button variant="outline">Dashboard</Button>
              </Link>
            )}

            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

