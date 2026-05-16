import { useEffect, useRef } from "react";
import { features, stats } from "../../utils/home/whyPartner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyPartner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  // Counter Animation Function
  const animateCounter = (el: HTMLElement, target: number, suffix: string) => {
    let start = 0;
    const duration = 1800;
    const increment = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = start + suffix;
      }
    }, 16);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Side Animation (Slide from Left)
      gsap.fromTo(
        leftRef.current,
        {
          opacity: 0,
          x: -80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stats Cards Animation (Fade + Scale from Right)
      statsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Trigger Counter Animation when stats are visible
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          statsRef.current.forEach((card, index) => {
            const numberEl = card?.querySelector(".counter");
            const stat = stats[index];
            if (numberEl && stat) {
              animateCounter(numberEl as HTMLElement, stat.value, stat.suffix);
            }
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className=" py-24 px-6 text-white overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side */}
          <div ref={leftRef}>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
              Why Partner with{" "}
              <span className="text-purple-500">LazyDevs?</span>
            </h2>

            <p className="text-lg text-gray-400 mb-12">
              At LazyDevs IT Lab, we don't just write code; we build
              relationships and delivering value. Our commitment to quality and
              innovation sets us apart in the crowded digital landscape.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 p-2 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <feature.icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="grid grid-cols-2 gap-6 pt-8 lg:pt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) statsRef.current[index] = el;
                }}
                className={`rounded-3xl p-8 flex flex-col justify-center items-center text-center h-full transition-all duration-300 hover:scale-105 border border-zinc-800 text-white ${
                  index === 1 || index === 2
                    ? "bg-purple-700 shadow-xl shadow-purple-500/30"
                    : "bg-zinc-900"
                }`}
              >
                <div className="text-2xl md:text-4xl font-bold mb-3 counter">
                  0{stat.suffix}
                </div>
                <p className="text-white text-xl font-medium text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
