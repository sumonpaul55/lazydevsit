import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export const MainLayout = () => {
  return (
    <div className="text-5xl font-bold">
      <Navbar />
      <div className="min-h-screen container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
