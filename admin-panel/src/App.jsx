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
                  <Route
                    path="/"
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/services" element={<Services />} />
                  <Route path="/admin/projects" element={<Projects />} />
                  <Route path="/admin/blogs" element={<Blogs />} />
                  <Route
                    path="/admin/testimonials"
                    element={<Testimonials />}
                  />
                  <Route path="/admin/careers" element={<Careers />} />
                  <Route path="/admin/inquiries" element={<Inquiries />} />
                  <Route
                    path="/admin/technologies"
                    element={<Technologies />}
                  />
                  <Route path="/admin/team" element={<Team />} />
                  <Route path="/admin/gallery" element={<Gallery />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/profile" element={<Profile />} />
                  <Route
                    path="/admin/hero-sections"
                    element={<HeroSection />}
                  />
                  <Route
                    path="/admin/business-solutions"
                    element={<BusinessSolutions />}
                  />
                  <Route path="/admin/how-we-work" element={<HowWeWork />} />
                  <Route path="/admin/about-page" element={<AboutPage />} />
                  <Route path="/admin/founders" element={<Founders />} />
                  <Route
                    path="/admin/why-choose-us"
                    element={<WhyChooseUs />}
                  />
                  <Route
                    path="/admin/vision-mission"
                    element={<VisionMission />}
                  />
                  <Route path="/admin/it-solutions" element={<ITSolutions />} />
                  <Route
                    path="/admin/business-development"
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
