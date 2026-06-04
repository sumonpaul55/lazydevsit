import { useEffect, useRef } from "react";
import { services } from "../../utils/home/service";
import gsap from "gsap";
import { FaChartLine, FaCode, FaPalette } from "react-icons/fa";

export default function Service() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Header Animation
      gsap.fromTo(
        ".service-header",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Tags Animation
      gsap.fromTo(
        ".service-tag",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-tags-wrapper",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = (title: string) => {
    console.log(`Navigating to ${title}`);
  };
  return (
    <section ref={sectionRef} className="py-24 px-6 text-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm tracking-[3px] uppercase font-medium mb-4">
            WE DON'T ONLY DO, WE KEEP THE HIGHEST STANDARDS
          </p>

          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter leading-tight">
            These are the things
            <br />
            we do for you
          </h2>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              { label: "Conversion Friendly UI/UX", icon: <FaPalette /> },
              { label: "Interactive Web Solution", icon: <FaCode /> },
              { label: "Unified Online Visibility", icon: <FaChartLine /> },
            ].map((tag, i) => (
              <div
                key={i}
                className="tag px-6 py-3 bg-white/5 hover:bg-white/10 border border-(--border-color)
                           hover:border-white/30 rounded-3xl text-sm font-medium flex items-center gap-3 
                           transition-all duration-300 cursor-pointer active:scale-95"
              >
                <i className={"fa-solid text-yellow-400"}>{tag.icon}</i>
                <span>{tag.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-(--card-bg) border border-(--border-color)
                         hover:border-white/30 rounded-3xl p-8 h-full flex flex-col 
                         transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`${service.bgColor} w-20 h-20 rounded-3xl flex items-center justify-center mb-10 
                           text-5xl ${service.color} transition-transform duration-500 group-hover:scale-110`}
              >
                <i>{service.icon}</i>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-semibold mb-6 tracking-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-(--muted-text) leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Link */}
              <button
                onClick={() => handleExplore(service.title)}
                className={`mt-10 flex items-center gap-3 text-white 
  ${service.hoverColor}
  font-medium transition-colors duration-300 w-fit`}
              >
                {service.linkText}
                <span className="block w-8 h-px bg-current transition-all group-hover:w-12" />
                <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
