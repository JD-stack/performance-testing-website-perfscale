import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { NavBar } from './components/NavBar';
import Blog from './pages/Blog';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-visible">
        <NavBar />

        <main className="flex-grow min-h-screen overflow-visible">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin page */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

