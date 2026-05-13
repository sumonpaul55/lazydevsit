/* eslint-disable @typescript-eslint/no-unused-vars */
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { projects } from "../../utils/home/featureProjectData";
import { useCallback, useEffect, useRef } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function FeaturedProject() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      dragFree: false,
    },
    [Autoplay({ delay: 2500, stopOnInteraction: true })],
  );

  const slidesRef = useRef<HTMLDivElement[]>([]);

  const updateSlideStyles = useCallback(() => {
    if (!emblaApi) return;

    const scrollSnaps = emblaApi.scrollSnapList();
    const scrollProgress = emblaApi.scrollProgress();

    emblaApi.slideNodes().forEach((slide, index) => {
      const slideProgress = (scrollProgress - scrollSnaps[index]) * -1;
      const absProgress = Math.min(Math.abs(slideProgress), 1);

      let rotateY = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 10;

      if (slideProgress > 0.1) {
        // Left card
        rotateY = -18;
        scale = 0.88;
        opacity = 0.75;
        zIndex = 5;
      } else if (slideProgress < -0.1) {
        // Right card
        rotateY = 18;
        scale = 0.88;
        opacity = 0.75;
        zIndex = 5;
      } else {
        // Center card
        rotateY = 0;
        scale = 1;
        opacity = 1;
        zIndex = 20;
      }

      const transform = `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`;

      slide.style.transform = transform;
      slide.style.opacity = opacity.toString();
      slide.style.zIndex = zIndex.toString();
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", updateSlideStyles);
    emblaApi.on("scroll", updateSlideStyles);
    emblaApi.on("resize", updateSlideStyles);

    // Initial update
    setTimeout(updateSlideStyles, 100);

    return () => {
      emblaApi.off("select", updateSlideStyles);
      emblaApi.off("scroll", updateSlideStyles);
    };
  }, [emblaApi, updateSlideStyles]);

  return (
    <section className=" py-24 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Discover our portfolio of cutting-edge digital solutions
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 md:gap-1 mb-5">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    if (el) slidesRef.current[index] = el;
                  }}
                  className="flex-[1_0_88%] md:flex-[1_0_48%] lg:flex-[1_0_440px] min-w-0 transition-all duration-300 p-2 border rounded-sm bg-primary border-zinc-900 overflow-hidden h-full flex flex-col"
                >
                  <div className="group bg-linear-to-br from-[#160931] via-[#0b021b] to-[#110726]  rounded-xl overflow-hidden h-full flex flex-col ">
                    {/* Image Container */}
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md text-xs font-mono px-4 py-1.5 rounded-full">
                        {project.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="w-fit bg-blue-600 text-xs font-medium px-4 py-1 rounded-full">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-semibold my-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-[15px] leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-zinc-800 px-3 py-2 rounded-full text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="mt-auto w-1/2 bg-blue-600 hover:bg-blue-500 transition-all py-2 rounded-2xl font-medium flex items-center justify-center gap-2 group/btn">
                        {project.buttonText}
                        <BsBoxArrowUpRight className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
