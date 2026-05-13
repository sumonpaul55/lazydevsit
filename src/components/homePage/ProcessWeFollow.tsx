/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    label: "STRATEGY",
    title: "Get a Free Discovery Call",
    color: "from-blue-500 to-cyan-400",
    bgColor: "rgb(10, 25, 60)", // deep navy blue
    description:
      "We start with a 30-minute call to understand your goals, audiences, and current bottlenecks so every design and code decision is rooted in your growth strategy.",
  },
  {
    number: "02",
    label: "DESIGN",
    title: "Let Us Design Exactly What You Need",
    color: "from-purple-500 to-pink-400",
    bgColor: "rgb(28, 10, 55)", // deep violet/purple
    description:
      "We design layouts that guide attention, reduce cognitive load, and move users toward conversion pixel-perfect, brand-aligned, and built to perform.",
  },
  {
    number: "03",
    label: "DEVELOPMENT",
    title: "We Build It Fast & Clean, No Tech Debt",
    color: "from-sky-500 to-blue-600",
    bgColor: "rgb(8, 22, 50)", // deep midnight blue
    description:
      "Well-architected, modular development that scales. Clean code, optimised performance, and zero shortcuts from design to live.",
  },
  {
    number: "04",
    label: "GROWTH",
    title: "Finally We Optimise & Grow Your Revenue",
    color: "from-emerald-500 to-teal-400",
    bgColor: "rgb(5, 30, 25)", // deep dark teal/green
    description:
      "Post-launch we analyse, iterate, and optimise turning data into decisions that compound your conversion rate month over month.",
  },
];

const CARD_GAP = 24;

export default function ProcessWeFollow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length || !cardsWrapperRef.current) return;

    // How many px of the previous card remain visible when covered
    const PEEK = 40;

    const ctx = gsap.context(() => {
      // ── Step 1: lay cards out top-to-bottom with gaps (absolute positioning) ──
      let cumulativeTop = 0;
      const initialTops: number[] = [];

      cards.forEach((card, i) => {
        initialTops.push(cumulativeTop);
        gsap.set(card, { y: cumulativeTop, scale: 1 });
        cumulativeTop += card.offsetHeight + CARD_GAP;
      });

      // Give the wrapper its natural height so the page scrolls correctly
      cardsWrapperRef.current!.style.height = `${cumulativeTop - CARD_GAP}px`;

      // ── Step 2: for each card (after the first) animate it up over the previous ──
      cards.forEach((card, i) => {
        if (i === 0) return;

        const prevCard = cards[i - 1];
        const prevTop = initialTops[i - 1];

        // Final resting position of card i: PEEK px below card (i-1)'s top
        const targetTop = prevTop + PEEK;
        const travelDistance = initialTops[i] - targetTop;

        // Animate card i upward while pinning card i-1
        ScrollTrigger.create({
          trigger: prevCard,
          start: "top top",
          end: `+=${travelDistance}`,
          pin: true,
          pinSpacing: false, // wrapper height already accounts for the scroll space
          anticipatePin: 1,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Slide card i up into place
            gsap.set(card, { y: initialTops[i] - travelDistance * p });
            // Subtly push previous card back for depth
            gsap.set(prevCard, { scale: 1 - p * 0.025 });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto">
      {/* Header — scrolls away before cards pin */}
      <div className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[3px] text-gray-200 font-medium mb-3">
            THE PROCESS WE FOLLOW
          </p>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-gray-200 leading-tight">
            We Don&apos;t Just Do It,
            <br />
            We Become Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Growth Partner!
            </span>
          </h2>
        </div>
      </div>

      {/* Cards wrapper — gets pinned while cards stack */}
      <div
        ref={cardsWrapperRef}
        className="relative flex justify-center px-6 pb-24"
        style={{ minHeight: "100vh" }}
      >
        <div className="relative w-full max-w-7xl">
          {processSteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="absolute top-0 left-0 w-full rounded-3xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: step.bgColor,
                zIndex: index + 1,
                transformOrigin: "top center",
              }}
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start gap-8">
                  {/* Number */}
                  <div className="shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white font-bold text-5xl shadow-inner`}
                    >
                      {step.number}
                    </div>
                    <p className="text-xs font-semibold tracking-widest mt-4 text-gray-400">
                      {step.label}
                    </p>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-3xl font-semibold leading-tight text-white mb-6">
                      {step.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom liner Bar */}
              <div className={`h-1.5 bg-linear-to-r ${step.color} w-full`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
