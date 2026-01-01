/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, } from "react";
import { contactMethods } from "../utils/contact/ContactData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Values:", formData);
  };



  return (
    <div className="min-h-screen  text-white">
      {/* Hero Header */}
      <header className="relative h-112.5 w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/contact_banner.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1a0b2e]/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Contact
          </h1>
          <p className="text-gray-200  text-lg sm:text-xl leading-relaxed font-medium">
            Bridging the gap between complex ideas and seamless digital reality.
            We specialize in crafting professional, user-centric websites that
            empower your business to thrive in the modern market.
          </p>
        </div>
      </header>
      {/* Contact Info Column */}
      <section className="space-y-12 flex lg:flex-row flex-col md:gap-18 my-20 px-5 xl:px-0">
        <div className="flex-[30%]">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">Get in touch</h2>
          <p className="text-gray-400 text-lg sm:text-xl">
            Have a project in mind? Reach out to discuss how we can build your
            next big digital success together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14 flex-[70%]">
          {contactMethods?.map((method) => (
            <div key={method.id} className="group">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="bg-[#8b5cf6] p-4 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-purple-500/20">
                    {method.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold">{method.title}</h3>
                  <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                    {method.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Column */}
      <section className="max-w-7xl mx-auto px-5 xl:px-0 my-20">
        <h2 className="text-3xl sm:text-5xl font-bold mb-10">Right To Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              type="text"
              placeholder="Full Name"
              className="w-full bg-white text-black px-5 py-4 rounded-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              required
            />
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              type="email"
              placeholder="Your Email"
              className="w-full bg-white text-black px-5 py-4 rounded-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              required
            />
          </div>
          <textarea
            onChange={(e: any) => handleChange(e)}
            placeholder="Message"
            rows={5}
            className="w-full bg-white text-black px-5 py-4 rounded-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full uppercase text-[10px] tracking-[0.2em] transition-all cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
