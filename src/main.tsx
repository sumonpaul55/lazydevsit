import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/about/Aboutus";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
