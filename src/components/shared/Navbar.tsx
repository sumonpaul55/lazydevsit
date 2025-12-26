import { useState } from "react";
import { navLinks } from "../../utils/navbar/navbarItem";
import type { NavItem } from "../../utils/types/navbar.type";
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <nav className="bg-[#120a1c] text-white px-6 py-4 relative font-sans">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">LazyDevs</span>
            <div className="w-6 h-6 bg-purple-500 rounded-sm transform rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 text-[17px]">
            {navLinks.map((link: NavItem) => (
              <li
                key={link.key}
                className="group flex items-center gap-1 cursor-pointer"
              >
                <Link
                  to={link.url}
                  className="hover:text-purple-400 transition-colors"
                >
                  {link.navName}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button className="border-2 border-white rounded-full px-6 py-2 uppercase text-sm font-semibold hover:bg-white hover:text-[#120a1c] transition-all">
              Contact
            </button>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden bg-gray-800 p-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            <div className="w-6 h-0.5 bg-gray-300 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-300 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-300"></div>
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 z-50 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden`}
        >
          {/* Dark Sidebar */}
          <div className="bg-[#120a1c] w-3/4 h-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">LazyDevs</span>
                <div className="w-5 h-5 bg-purple-500 transform rotate-45"></div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-purple-600 px-3 py-1 rounded text-white font-bold"
              >
                X
              </button>
            </div>

            <ul className="flex flex-col gap-6">
              {navLinks.map((link: NavItem) => (
                <li
                  key={link.key}
                  className="text-lg font-medium border-b border-gray-800 pb-2"
                >
                  <div className="flex justify-between items-center">
                    <Link to={link.url}>{link.navName}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Clickable background to close */}
          <div
            className="absolute inset-0 bg-black opacity-50 -z-10"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      </nav>
    </div>
  );
}
