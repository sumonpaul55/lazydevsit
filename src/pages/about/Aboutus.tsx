/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const services = [
  "POS Software",
  "ERP Software",
  "Management Software",
  "Stock Management",
  "Web Development",
  "Landing Pages",
  "Blog Portals",
  "E-commerce Solutions",
  "Portfolio Websites",
  "Agency Websites",
  "React.js Development",
  "Next.js Development", 
  "Node.js Development",
  "React Native Development",
  "Mobile Applications",
];

const team = [
  {
    name: "Frontend Developer",
    role: "React & Next.js Specialist",
  },
  {
    name: "Backend Developer",
    role: "Node.js & Database Expert",
  },
  {
    name: "UI/UX Designer",
    role: "Creative Experience Designer",
  },
  {
    name: "Mobile App Developer",
    role: "React Native Specialist",
  },
];


export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-title",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      }
    );

    gsap.fromTo(".hero-text",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      }
    );

    const serviceCards = gsap.utils.toArray(".service-card", containerRef.current);
    serviceCards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    const teamCards = gsap.utils.toArray(".team-card", containerRef.current);
    teamCards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#050816] text-white overflow-hidden">
      {/* HERO SECTION */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-20"
      >
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-cyan-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm tracking-wide mb-6">
              ABOUT OUR AGENCY
            </span>

            <h1 className="hero-title text-5xl md:text-6xl font-black leading-tight">
              Building Powerful
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                Digital Solutions
              </span>
            </h1>

            <p className="hero-text mt-8 text-lg text-gray-300 leading-relaxed">
              We are a passionate team of 4 developers and designers focused on
              delivering modern software solutions for businesses worldwide.
              From enterprise ERP systems to high-converting websites and mobile
              applications, we help brands grow with scalable technology.
            </p>

            <div className="hero-text flex flex-wrap gap-4 mt-10">
              <button className="px-7 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition-all duration-300">
                Start Your Project
              </button>

              <button className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition">
                View Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                  <h3 className="text-4xl font-black text-cyan-400">15+</h3>
                  <p className="mt-2 text-gray-400">Services</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                  <h3 className="text-4xl font-black text-purple-400">4</h3>
                  <p className="mt-2 text-gray-400">Core Team Members</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                  <h3 className="text-4xl font-black text-pink-400">100%</h3>
                  <p className="mt-2 text-gray-400">Client Focused</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                  <h3 className="text-4xl font-black text-green-400">24/7</h3>
                  <p className="mt-2 text-gray-400">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="px-6 lg:px-20 py-24" ref={cardsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-semibold tracking-widest uppercase">
              Our Expertise
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-4">
              Services We Provide
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              We create scalable software products and high-performance digital
              experiences tailored to your business goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold">
                    {index + 1}
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">{service}</h3>

                  <p className="mt-4 text-gray-400 leading-relaxed">
                    Professional and scalable solutions designed to improve
                    performance, user experience, and business growth.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div
        ref={teamRef}
        className="px-6 lg:px-20 py-24 bg-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 font-semibold tracking-widest uppercase">
              Our Team
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-4">
              Meet The Experts
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              A small but highly dedicated team focused on quality, innovation,
              and long-term client success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-24 h-24 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-3xl font-black">
                  {member.name.charAt(0)}
                </div>

                <h3 className="mt-6 text-2xl font-bold">{member.name}</h3>

                <p className="mt-2 text-cyan-400">{member.role}</p>

                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  Passionate about building reliable, scalable, and modern
                  digital products with the latest technologies.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-20 py-24">
        <div className="max-w-5xl mx-auto text-center rounded-[40px] border border-white/10 bg-linear-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl p-12">
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Let’s Build Something Amazing Together
          </h2>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Whether you need a business management system, e-commerce platform,
            or a modern web application — our team is ready to turn your ideas
            into reality.
          </p>

          <button className="mt-10 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition-all duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
