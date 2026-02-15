import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";

import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { AdminDashboard } from "./pages/AdminDashboard";

import Blog from "./pages/Blog";
import BlogPage from "./pages/BlogPage";
import SinglePost from "./pages/SinglePost";
import AdminPostEditor from "./pages/AdminPostEditor";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow min-h-screen overflow-visible pt-20">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            {/* New Blog System */}
            <Route path="/posts" element={<BlogPage />} />
            <Route path="/posts/:id" element={<SinglePost />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/posts/new" element={<AdminPostEditor />} />
          </Routes>
        </main>

        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}
