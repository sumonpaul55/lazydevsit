import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const left = "/left.avif";
const right = "/right.avif";

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

    gsap.fromTo(
      leftIconRef.current,
      {
        opacity: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.4,
        clearProps: "all",
      },
    );

    gsap.fromTo(
      rightIconRef.current,
      {
        opacity: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.6,
        clearProps: "all",
      },
    );

    gsap.to(leftIconRef.current, {
      y: -35,
      x: 15,
      rotation: -4,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(rightIconRef.current, {
      y: 35,
      x: -15,
      rotation: 4,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0b3d] via-[#0f172a] to-[#0a3a3a] overflow-hidden px-6 py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#4f46e540_0%,transparent_45%)] z-0" />

      <img
        ref={leftIconRef}
        src={left}
        alt="left decoration"
        className="absolute left-10 top-1/4 hidden lg:block w-64 z-20 object-contain opacity-100 brightness-125 contrast-125"
      />

      <img
        ref={rightIconRef}
        src={right}
        alt="right decoration"
        className="absolute right-10 top-1/3 hidden lg:block w-64 z-20 object-contain opacity-100 brightness-125 contrast-125"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center relative z-30"
      >
        <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-tight text-white mb-6">
          Design and development that moves your metrics -
          <span className="bg-linear-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            higher conversions, better retention,
          </span>
          <span className="text-cyan-400"> zero friction.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Not an interactive average, we deliver a well-thought-out UI/UX that
          reduces friction, bundled with engineered development & experts'
          optimization to ensure the conversion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-500/30">
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
