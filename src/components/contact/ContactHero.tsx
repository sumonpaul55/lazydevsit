import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ContactHero() {

    const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-bg", {
        scale: 1.15,
        duration: 2,
        ease: "power3.out",
      });

      tl.from(
        ".hero-title",
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=1.5"
      );

      tl.from(
        ".hero-text",
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      );
    },
    { scope: container }
  );


  return (
    <div ref={container} className="text-white overflow-hidden">
      <header className="relative h-125 w-full flex items-center justify-center overflow-hidden">
        <div
          className="hero-bg absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/contact_banner.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1a0b2e]/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Contact
          </h1>
          <p className="hero-text text-gray-200  text-lg sm:text-xl leading-relaxed font-medium">
            Bridging the gap between complex ideas and seamless digital reality.
            We specialize in crafting professional, user-centric websites that
            empower your business to thrive in the modern market.
          </p>
        </div>
      </header>
    </div>
  );
}
