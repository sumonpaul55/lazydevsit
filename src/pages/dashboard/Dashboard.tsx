import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FiFolder, FiImage, FiCpu, FiPlus, FiArrowRight, FiClock } from "react-icons/fi";

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  images: string[];
  createdAt: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Astra E-Commerce Hub",
    description: "A highly-scalable online shopping platform utilizing microservices and serverless infrastructure with blazing fast search indexing and instant checkouts.",
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Prisma"],
    features: [
      "Stripe payment integration with webhooks support",
      "Dynamic search filtering using Elasticsearch",
      "Robust state management with Zustand",
      "Automated PDF invoice generation"
    ],
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-06-01"
  },
  {
    id: 2,
    name: "Nebula Project Manager",
    description: "An interactive project scheduling dashboard built for developers to collaborate, log work milestones, track issue sprints, and visualize task roadmaps.",
    technologies: ["React", "GSAP", "Socket.io", "Express", "PostgreSQL"],
    features: [
      "Real-time task synchronization via WebSocket rooms",
      "Custom Gantt-charts powered by SVG and GSAP timeline libraries",
      "JWT-based security with MFA compatibility",
      "Detailed project productivity reports"
    ],
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-06-03"
  }
];

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Read stats from localStorage
  useEffect(() => {
    // Get user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Get projects or initialize default ones
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      localStorage.setItem("projects", JSON.stringify(DEFAULT_PROJECTS));
      setProjects(DEFAULT_PROJECTS);
    }
  }, []);

  // Compute stats
  const totalProjects = projects.length;
  const totalImages = projects.reduce((sum, p) => sum + (p.images?.length || 0), 0);
  const uniqueTechs = new Set(projects.flatMap(p => p.technologies || [])).size;

  const statCards = [
    {
      label: "Total Projects",
      value: totalProjects,
      description: "Active featured works",
      icon: <FiFolder size={24} className="text-purple-400" />,
      colorClass: "from-purple-500/10 to-indigo-500/5 border-purple-500/15"
    },
    {
      label: "Images Hosted",
      value: totalImages,
      description: "Visual assets count",
      icon: <FiImage size={24} className="text-blue-400" />,
      colorClass: "from-blue-500/10 to-cyan-500/5 border-blue-500/15"
    },
    {
      label: "Technologies",
      value: uniqueTechs,
      description: "Frameworks & tools used",
      icon: <FiCpu size={24} className="text-emerald-400" />,
      colorClass: "from-emerald-500/10 to-teal-500/5 border-emerald-500/15"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
            {user?.name || "Admin"}
          </span>
          ! 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here is your website's projects overview. You can manage them anytime.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`glass rounded-2xl p-6 border bg-gradient-to-tr ${stat.colorClass} relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-4xl font-black mt-2 font-mono tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-4 flex items-center gap-1 font-sans">
              <FiClock size={12} />
              <span>{stat.description}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Actions & Help */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-4">Quick Workspaces</h3>
            <div className="space-y-3">
              <Link
                to="/dashboard/projects"
                className="flex items-center justify-between p-4 bg-purple-600/10 hover:bg-purple-600/20 active:scale-[0.98] border border-purple-500/20 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <FiPlus size={16} />
                  <span>Post New Project</span>
                </span>
                <FiArrowRight size={16} />
              </Link>
              <Link
                to="/dashboard/projects"
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                <span>Manage Projects List</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 text-gray-400 text-xs leading-relaxed">
            <h4 className="font-semibold text-white mb-2 uppercase tracking-wider text-[10px]">
              Admin Operations Help
            </h4>
            <p className="mb-2">
              Post projects using details such as name, technologies stack, functional features, and high-res screenshot images.
            </p>
            <p>
              Up to 10 image assets are allowed per project. Ensure tags are entered correctly to aid public directory search results.
            </p>
          </div>
        </div>

        {/* Right Column: Recent Project Previews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Recent Projects</h3>
              <Link
                to="/dashboard/projects"
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold transition-colors duration-200"
              >
                <span>View All</span>
                <FiArrowRight size={14} />
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FiFolder size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No projects listed yet. Click post above to start!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all duration-200"
                  >
                    {project.images && project.images[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-20 h-16 object-cover rounded-lg border border-white/10 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                        <FiImage size={20} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate text-white">
                        {project.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-1 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[9px] text-gray-500 px-1 py-0.5">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
