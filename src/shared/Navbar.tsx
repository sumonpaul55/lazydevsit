/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router";
import { navLinks } from "../utils/navbar/navbarItem";
import type { NavItem } from "../utils/types/navbar.type";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useRef } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [expandedService, setExpandedService] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const tl: any = useRef<gsap.core.Timeline | null>(null);

  // GSAP Slide Down Animation
  useEffect(() => {
    if (!menuRef.current) return;

    if (tl.current) tl.current.kill();

    if (isServicesOpen) {
      tl.current = gsap.fromTo(
        menuRef.current,
        {
          y: -30,
          opacity: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    } else {
      tl.current = gsap.to(menuRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, [isServicesOpen]);

  return (
    <nav className="bg-[#120a1c] text-white px-6 py-4 relative font-sans z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">LazyDevs</span>
          <div className="w-6 h-6 bg-purple-500 rounded-sm transform rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-[17px]">
          {navLinks.map((link: NavItem) => (
            <li
              key={link.key}
              className="group relative"
              onMouseEnter={() =>
                link.navName === "Services" && setIsServicesOpen(true)
              }
              onMouseLeave={() =>
                link.navName === "Services" && setIsServicesOpen(false)
              }
            >
              <Link
                to={link.url}
                className="hover:text-purple-400 transition-colors py-2 flex items-center justify-center gap-1"
              >
                {link.navName}
                {link.navName === "Services" && (
                  <span className="text-xs"> ▼</span>
                )}
              </Link>

              {/* Desktop Mega Menu */}
              {link.navName === "Services" && isServicesOpen && (
                <div
                  ref={menuRef}
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 w-275 hidden md:block transition-opacity ${
                    isServicesOpen
                      ? "pointer-events-auto"
                      : "pointer-events-none"
                  }`}
                  style={{ opacity: 0, transform: "translateY(-40px)" }}
                >
                  <div className="bg-white text-black rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                      <h3 className="text-xl font-semibold mb-1 text-purple-600">
                        Service
                      </h3>
                      <hr className="mb-6 text-gray-300" />
                      <div className="grid grid-cols-3 gap-10">
                        {/* Three Columns */}
                        <div className="col-span-3 grid grid-cols-3 gap-10">
                          {link.subItems?.map((section, idx) => (
                            <div key={idx}>
                              <h4 className="font-semibold text-lg mb-4">
                                {section.title}
                              </h4>
                              <ul className="space-y-3 text-[15px] ">
                                {section.items.map((item, i) => (
                                  <li
                                    key={i}
                                    className="hover:text-purple-500 hover:font-medium hover:underline rounded-xs"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button className="border-2 border-white rounded-full px-6 py-2 uppercase text-sm font-semibold hover:bg-white hover:text-[#120a1c] transition-all">
            Contact
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden bg-gray-800 p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-0.5 bg-gray-300 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-300 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-300"></div>
        </button>
      </div>

      {/* ==================== MOBILE MENU ==================== */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-[#120a1c] w-full max-w-sm h-full p-6 shadow-2xl overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">LazyDevs</span>
              <div className="w-5 h-5 bg-purple-500 transform rotate-45"></div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-purple-600 px-4 py-1 rounded text-white font-bold"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col gap-6 text-lg">
            {navLinks.map((link: NavItem) => (
              <li key={link.key} className="border-b border-gray-800 pb-4">
                {link.navName === "Services" && link.subItems ? (
                  <>
                    {/* Services with Expand Button */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setExpandedService(!expandedService)}
                    >
                      <Link to={link.url} className="font-medium">
                        {link.navName}
                      </Link>
                      <span
                        className={`transition-transform duration-200 ${expandedService ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </div>

                    {/* Submenu */}
                    {expandedService && (
                      <div className="mt-4 pl-4 space-y-6 border-l border-gray-700">
                        {link.subItems.map((section, idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-purple-400 mb-3">
                              {section.title}
                            </h4>
                            <ul className="space-y-2 text-[15px] text-gray-300">
                              {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.url}
                    onClick={() => setIsOpen(false)}
                    className="font-medium"
                  >
                    {link.navName}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 -z-10"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </nav>
  );
}
