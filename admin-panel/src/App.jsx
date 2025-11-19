import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Testimonials from "./pages/Testimonials";
import Careers from "./pages/Careers";
import Inquiries from "./pages/Inquiries";
import Technologies from "./pages/Technologies";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

// Layout
import AdminLayout from "./components/Layout/AdminLayout";
import HeroSection from "./pages/HeroSection";
import BusinessSolutions from "./pages/BusinessSolutions";
import HowWeWork from "./pages/HowWeWork";
import AboutPage from "./pages/AboutPage";
import Founders from "./pages/Founders";
import WhyChooseUs from "./pages/WhyChooseUs";
import VisionMission from "./pages/VisionMission";
import BusinessDevelopment from "./pages/BusinessDevelopment";
import ITSolutions from "./pages/ITSolutions";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/inquiries" element={<Inquiries />} />
                  <Route path="/technologies" element={<Technologies />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/hero-sections" element={<HeroSection />} />
                  <Route
                    path="/business-solutions"
                    element={<BusinessSolutions />}
                  />
                  <Route path="/how-we-work" element={<HowWeWork />} />
                  <Route path="/about-page" element={<AboutPage />} />
                  <Route path="/founders" element={<Founders />} />
                  <Route path="/why-choose-us" element={<WhyChooseUs />} />
                  <Route path="/vision-mission" element={<VisionMission />} />
                  <Route path="/it-solutions" element={<ITSolutions />} />
                  <Route
                    path="/business-development"
                    element={<BusinessDevelopment />}
                  />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
