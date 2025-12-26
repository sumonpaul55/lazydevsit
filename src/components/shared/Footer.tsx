import {
  FaEnvelope,
  FaFacebook,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { footerData } from "../../utils/footer/footerData";
import type { FooterSection } from "../../utils/types/footer.type";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div>
      <footer className="bg-[#0f0715] text-white pt-16 pb-8 px-6 font-sans border-t border-gray-800">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand & Socials */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight">
                  LazyDevs
                </span>
                <div className="w-5 h-5 bg-purple-500 transform rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  to="#"
                  className="hover:text-purple-400 transition-colors"
                >
                  <FaFacebook className=" text-xl" />
                </Link>
                <Link
                  to="#"
                  className="hover:text-purple-400 transition-colors"
                >
                  <FaTwitter className=" text-xl" />
                </Link>
                <Link
                  to="#"
                  className="hover:text-purple-400 transition-colors"
                >
                  <FaYoutube className=" text-xl" />
                </Link>
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div className="space-y-3 text-gray-400 text-sm">
              <h4 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">
                Headquarter
              </h4>
              <p className="text-lg text-white font-medium">
                123 Main Street, Suite 101,
                <br /> Cityville
              </p>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-purple-500" />
                <span className="text-white">(877)-555-6666</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-purple-500" />
                <span className="text-white">info@domain.com</span>
              </div>
            </div>

            {/* Column 3 & 4: Dynamic Links */}
            {footerData.map((section: FooterSection) => (
              <div key={section.title}>
                <h4 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">
                  {section.title}
                </h4>
                <ul className="">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.url}
                        className="text-white transition-colors text-base md:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white my-8"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © 2025 · <span className="text-white">LazyDevs</span> · Template
              By
              <span className="text-purple-400 ml-1">LazyDevIT.Com</span>
            </p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <span className="text-gray-700">|</span>
              <Link to="#" className="hover:text-white">
                Our Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
