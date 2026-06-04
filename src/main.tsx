import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import AboutUs from "./pages/about/Aboutus";
import { Contact } from "./pages/contact/Contact";
import HomePage from "./components/homePage/HomePage";
import Login from "./pages/login/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProjects from "./pages/dashboard/DashboardProjects";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
        <Route path="login" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<DashboardProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
