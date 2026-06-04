import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUploadCloud, FiInfo, FiPlusCircle, FiImage } from "react-icons/fi";

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  images: string[]; // URLs or object URLs
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

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  
  // Validation
  const [errors, setErrors] = useState<{ name?: string; description?: string; images?: string }>({});

  useEffect(() => {
    const stored = localStorage.getItem("projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      localStorage.setItem("projects", JSON.stringify(DEFAULT_PROJECTS));
      setProjects(DEFAULT_PROJECTS);
    }
  }, []);

  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingProject(null);
    setName("");
    setDescription("");
    setTechnologies([]);
    setFeatures([]);
    setImages([]);
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setName(project.name);
    setDescription(project.description);
    setTechnologies([...project.technologies]);
    setFeatures([...project.features]);
    setImages([...project.images]);
    setErrors({});
    setIsModalOpen(true);
  };

  // Delete project
  const handleDeleteProject = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const filtered = projects.filter((p) => p.id !== id);
      saveProjectsToStorage(filtered);
    }
  };

  // Add technology tag
  const handleAddTech = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") return;
    if (e.type === "keydown") e.preventDefault(); // prevent form submit

    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setTechInput("");
    }
  };

  // Remove technology tag
  const handleRemoveTech = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  // Add feature bullet
  const handleAddFeature = (e: React.MouseEvent) => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures([...features, trimmed]);
      setFeatureInput("");
    }
  };

  // Remove feature bullet
  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Handle mock image upload (using Object URLs for frontend-only state)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 10 - images.length;
    if (remainingSlots <= 0) {
      setErrors({ ...errors, images: "Maximum image count of 10 reached." });
      return;
    }

    const uploadedCount = Math.min(files.length, remainingSlots);
    const newImageUrls: string[] = [];

    for (let i = 0; i < uploadedCount; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newImageUrls.push(url);
    }

    setImages([...images, ...newImageUrls]);
    setErrors({ ...errors, images: undefined });
  };

  // Remove specific image
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const newErrors: { name?: string; description?: string } = {};
    if (!name.trim()) newErrors.name = "Project name is required";
    if (!description.trim()) newErrors.description = "Project description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingProject) {
      // Edit
      const updated = projects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            name,
            description,
            technologies,
            features,
            images,
          };
        }
        return p;
      });
      saveProjectsToStorage(updated);
    } else {
      // Create new
      const newProj: Project = {
        id: Date.now(),
        name,
        description,
        technologies,
        features,
        images,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveProjectsToStorage([newProj, ...projects]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in relative z-10">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Project Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure, edit, and post your portfolio showcase projects.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white rounded-xl font-bold shadow-lg shadow-purple-600/30 transition-all duration-200"
        >
          <FiPlus size={20} />
          <span>Post Project</span>
        </button>
      </div>

      {/* Projects workspace table list */}
      <div className="glass border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-purple-300">
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Project Details</th>
                <th className="px-6 py-4 hidden md:table-cell">Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-500">
                    <FiImage size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">No projects registered</p>
                    <p className="text-xs text-gray-600 mt-1">Click the button above to add your first work.</p>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/2 transition-colors duration-150">
                    {/* Image Preview */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.images && project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.name}
                          className="w-20 h-14 object-cover rounded-lg border border-white/10"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-600">
                          <FiImage size={22} />
                        </div>
                      )}
                    </td>

                    {/* Details */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white truncate max-w-xs">{project.name}</div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-md leading-relaxed">
                        {project.description}
                      </div>
                    </td>

                    {/* Stack */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] text-gray-500 px-1 py-0.5">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(project)}
                          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-150"
                          title="Edit Project"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg transition-all duration-150"
                          title="Delete Project"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="glass border border-white/15 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative animate-fade-in my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/3">
              <h3 className="text-xl font-bold">
                {editingProject ? "Edit Project Details" : "Post New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors duration-150"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Project Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Astra E-Commerce Hub"
                  className={`w-full bg-white/5 border ${
                    errors.name ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10" : "border-white/10 focus:border-purple-500 focus:ring-purple-500/15"
                  } rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:ring-4 transition-all duration-200 text-sm`}
                />
                {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Project Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the project purposes, goals, and architectures..."
                  rows={4}
                  className={`w-full bg-white/5 border ${
                    errors.description ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10" : "border-white/10 focus:border-purple-500 focus:ring-purple-500/15"
                  } rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:ring-4 transition-all duration-200 text-sm resize-none`}
                />
                {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Technologies Tags Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Technologies (Stack Tags)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleAddTech}
                    placeholder="e.g. React, NextJS, TypeScript (Press Enter to Add)"
                    className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-purple-500/15 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:ring-4 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 text-white rounded-xl text-xs font-semibold transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
                
                {/* Tech Pills */}
                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 text-xs bg-purple-500/15 border border-purple-500/25 text-purple-300 px-3 py-1 rounded-full"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(index)}
                          className="hover:bg-purple-500/30 p-0.5 rounded-full text-purple-400 hover:text-white"
                        >
                          <FiX size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Features List Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Project Key Features
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Stripe checkout support"
                    className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-purple-500/15 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:ring-4 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 text-white rounded-xl text-xs font-semibold transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
                
                {/* Feature Bullet Items */}
                {features.length > 0 && (
                  <ul className="space-y-2 pt-2">
                    {features.map((feature, index) => (
                      <li
                        key={feature}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5 text-xs text-gray-300"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                          <span>{feature}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-gray-500 hover:text-rose-400 transition-colors duration-150"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image Previews & Upload */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300">
                    Project Screenshots ({images.length}/10 Max)
                  </label>
                  {errors.images && <p className="text-rose-400 text-xs">{errors.images}</p>}
                </div>

                {/* Upload drag drop zone */}
                {images.length < 10 && (
                  <label className="border-2 border-dashed border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <FiUploadCloud size={32} className="text-gray-500 group-hover:text-purple-400 transition-colors duration-200 mb-2" />
                    <p className="text-xs font-semibold text-white">Click or drag images to upload</p>
                    <p className="text-[10px] text-gray-500 mt-1">PNG, JPG or WEBP up to 10 total screenshots</p>
                  </label>
                )}

                {/* Image Previews Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                    {images.map((imgUrl, index) => (
                      <div
                        key={imgUrl}
                        className="relative group aspect-4/3 rounded-xl overflow-hidden border border-white/10 bg-white/5"
                      >
                        <img
                          src={imgUrl}
                          alt={`Project screen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-rose-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-md"
                          title="Remove Image"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 transition-all duration-200"
              >
                {editingProject ? "Save Changes" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
