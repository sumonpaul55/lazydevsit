/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { useState } from "react";
import { FiLinkedin } from "react-icons/fi";
import { PiFacebookLogoBold } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactSection() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none transition-all duration-300";
  useGSAP(
    () => {
      // Heading animation
      gsap.from(".section-heading", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Cards animation
      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
        },
        x: -60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Form animation
      gsap.from(".form-item", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Button animation
      gsap.from(".submit-btn", {
        scrollTrigger: {
          trigger: ".submit-btn",
          start: "top 90%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      // Hover cards
      const cards = gsap.utils.toArray(".contact-card");

      cards.forEach((card: any) => {
        const hover = gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          paused: true,
          ease: "power2.out",
        });

        card.addEventListener("mouseenter", () => hover.play());

        card.addEventListener("mouseleave", () => hover.reverse());
      });

      // Magnetic icons
      const icons = gsap.utils.toArray(".social-icon");

      icons.forEach((icon: any) => {
        icon.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = icon.getBoundingClientRect();

          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(icon, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            duration: 0.3,
          });
        });
      });
    },
    { scope: container },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    alert("Message sent successfully! 🎉");

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div ref={container} className="contact-section max-w-7xl mx-auto py-32">
      <div className="section-heading text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
          Ready to Transform Your Digital Presence?
        </h1>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          Let's discuss your project and how LazyDevs IT can help you achieve
          your goals.
        </p>
      </div>
      <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
        {/* Contact Info */}
        <div className="contact-info md:col-span-5 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-8">Let’s Connect</h2>

            <div className="space-y-6">
              <div className="contact-card  glass p-6 rounded-3xl flex gap-5 items-start">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="text-muted-text text-sm">EMAIL</p>
                  <a
                    href="mailto:hello@keyforge.store"
                    className="text-lg transition-colors"
                  >
                    support@lazydevs.com
                  </a>
                </div>
              </div>

              <div className="contact-card  glass p-6 rounded-3xl flex gap-5 items-start">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-muted-text text-sm">LOCATION</p>
                  <p className="text-lg">Sylhet, Bangladesh</p>
                </div>
              </div>

              <div className="contact-card  glass p-6 rounded-3xl flex gap-5 items-start">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  📞
                </div>
                <div>
                  <p className="text-muted-text text-sm">PHONE</p>
                  <a
                    href="tel:+49123456789"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    +88 8888 8888
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="glass p-8 rounded-3xl">
            <p className="text-(--muted-text) mb-4">
              Join the Mechanical Community
            </p>
            <div className="flex items-center gap-6 text-4xl">
              <Link to="#" className="hover:text-(--primary) transition-colors">
                <FiLinkedin />
              </Link>
              <Link to="#" className="hover:text-(--primary) transition-colors">
                <PiFacebookLogoBold className="text-4xl" />
              </Link>
              <Link to="#" className="hover:text-(--primary) transition-colors">
                <BsInstagram className="text-3xl" />
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="contact-form glass p-10 md:p-12 rounded-3xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-item">
                <label className="block text-sm text-(--muted-text) mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Alex Chen"
                />
              </div>
              <div className="form-item">
                <label className="block text-sm text-(--muted-text) mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="from-item mt-6">
              <label className="block text-sm text-(--muted-text) mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={inputClass}
                placeholder="+88 8888 8888"
              />
            </div>

            <div className="form-item mt-6">
              <label className="block text-sm text-(--muted-text) mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className={inputClass}
                placeholder="Custom Keyboard Inquiry"
              />
            </div>

            <div className="form-item mt-6">
              <label className="block text-sm text-(--muted-text) mb-2">
                Message
              </label>
              <textarea
                rows={8}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`${inputClass} rounded-3xl resize-y`}
                placeholder="Hi, I'm looking for recommendations on tactile switches..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn mt-10 w-full bg-purple-500 hover:bg-purple-500/60 disabled:opacity-70 transition-all text-white font-semibold py-4 rounded-2xl text-lg active:scale-[0.985]"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
