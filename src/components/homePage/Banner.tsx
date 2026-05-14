import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import left from "../../../public/left.avif";
import right from "../../../public/right.avif";

export default function Banner() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftIconRef = useRef<HTMLImageElement | null>(null);
  const rightIconRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Main content animation
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4 },
    );

    // Floating animation for left image
    gsap.to(leftIconRef.current, {
      y: -25,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Floating animation for right image
    gsap.to(rightIconRef.current, {
      y: -25,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Initial fade-in for images
    gsap.from(leftIconRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 1.2,
      delay: 0.4,
    });

    gsap.from(rightIconRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 1.2,
      delay: 0.6,
    });
  }, []);
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-[#1a0b3d] via-[#0f172a] to-[#0a3a3a] overflow-hidden px-6 py-20">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(at_top,#4f46e520_0%,transparent_40%)]" />

      {/* Left Floating Image */}
      <div className="absolute left-10 top-1/4 hidden lg:flex z-10 pointer-events-none">
        <img
          ref={leftIconRef}
          src={left}
          alt="left decoration"
          className="w-72 md:w-80 object-contain drop-shadow-2xl"
        />
      </div>

      {/* Right Floating Image */}
      <div className="absolute right-10 top-1/3 hidden lg:flex z-10 pointer-events-none">
        <img
          ref={rightIconRef}
          src={right}
          alt="right decoration"
          className="w-72 md:w-80 object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Centered Content — z-20 keeps text above images if they overlap */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center relative z-20"
      >
        <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-tight text-white mb-6">
          Design and development that moves your metrics -
          <span className="bg-linear-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            higher conversions, better retention,
          </span>
          <span className="text-cyan-400"> zero friction.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Not an interactive average, we deliver a well-thought-out UI/UX that
          reduces friction, bundled with engineered development &amp; experts'
          optimization to ensure the conversion.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-500/30">
            <span>📅</span>
            Book a discovery call
          </button>

          <button className="px-8 py-4 border border-white/30 hover:border-white/60 rounded-full font-semibold text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-2">
            View our work
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
