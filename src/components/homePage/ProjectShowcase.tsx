import { projectShowcaseData } from "../../utils/home/projectShowcaseData";

export default function ProjectShowcase() {
  return (
    <div className="min-h-screen py-16">
      {/* Two Row Infinite Ticker */}
      <div className="space-y-8 mb-20">
        {/* Row 1 - Scroll Left */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-ticker whitespace-nowrap">
            {[...projectShowcaseData, ...projectShowcaseData].map(
              (project, i) => (
                <div
                  key={i}
                  className="group min-w-85 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-zinc-950 rounded-t-3xl">
                    <div className="h-9 bg-zinc-900 flex items-center px-4 border-b border-zinc-800">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <div className="overflow-hidden aspect-16/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <div
                      className={`text-xs font-mono tracking-widest text-${project.accent}-400 mb-1`}
                    >
                      {project.category}
                    </div>
                    <h3 className="font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Row 2 - Scroll Right (Reverse) */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-ticker-reverse whitespace-nowrap">
            {[...projectShowcaseData, ...projectShowcaseData].map(
              (project, i) => (
                <div
                  key={i}
                  className="group min-w-[320px] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-zinc-950 rounded-t-3xl">
                    <div className="h-9 bg-zinc-900 flex items-center px-4 border-b border-zinc-800">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <div className="overflow-hidden aspect-16/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <div
                      className={`text-xs font-mono tracking-widest text-${project.accent}-400 mb-1`}
                    >
                      {project.category}
                    </div>
                    <h3 className="font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
