import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export const MainLayout = () => {
  return (
    <div className="bg-[#160C1C]">
      <Navbar />
      <div className="min-h-screen container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
