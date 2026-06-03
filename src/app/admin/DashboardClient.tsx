"use client";

import { useState } from "react";
import { LogOut, Plus, Trash2, X, Loader2, Calendar, Briefcase, Award, Upload, User, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  imageUrl: string | null;
  liveLink: string | null;
  githubLink: string | null;
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  iconUrl: string | null;
};

type Profile = {
  name: string;
  role: string;
  avatarUrl: string | null;
  available: boolean;
};

type DashboardClientProps = {
  initialProjects: Project[];
  initialAchievements: Achievement[];
  initialProfile: Profile;
};

export default function DashboardClient({ 
  initialProjects, 
  initialAchievements, 
  initialProfile 
}: DashboardClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [profileForm, setProfileForm] = useState<Profile>({
    name: initialProfile.name,
    role: initialProfile.role,
    avatarUrl: initialProfile.avatarUrl,
    available: initialProfile.available,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeError, setResumeError] = useState("");

  const [activeModal, setActiveModal] = useState<"project" | "achievement" | null>(null);
  const [loading, setLoading] = useState(false);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: "",
    imageUrl: "",
    liveLink: "",
    githubLink: ""
  });

  // Achievement Form State
  const [achievementForm, setAchievementForm] = useState({
    title: "",
    description: "",
    date: "",
    iconUrl: ""
  });

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setResumeError("Only PDF files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File must be under 5MB.");
      return;
    }
    setResumeError("");
    setUploadingResume(true);
    setResumeUploaded(false);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await fetch("/api/upload-resume", { method: "POST", body: formData });
      if (res.ok) {
        setResumeUploaded(true);
        setTimeout(() => setResumeUploaded(false), 4000);
      } else {
        const d = await res.json();
        setResumeError(d.error || "Upload failed");
      }
    } catch {
      setResumeError("Error uploading resume");
    } finally {
      setUploadingResume(false);
      e.target.value = "";
    }
  };

  const handleResumeDelete = async () => {
    if (!confirm("Remove current resume?")) return;
    try {
      const res = await fetch("/api/upload-resume", { method: "DELETE" });
      if (res.ok) alert("Resume removed successfully.");
      else alert("Failed to remove resume.");
    } catch {
      alert("Error removing resume.");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm)
      });
      if (res.ok) {
        const updatedProf = await res.json();
        setProfile(updatedProf);
        setProfileForm({
          name: updatedProf.name,
          role: updatedProf.role,
          avatarUrl: updatedProf.avatarUrl,
          available: updatedProf.available,
        });
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setProfileForm(prev => ({ ...prev, avatarUrl: data.url }));
        alert("Image uploaded successfully! Click 'Save Profile' to apply changes.");
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm)
      });
      if (res.ok) {
        const newProj = await res.json();
        setProjects([newProj, ...projects]);
        setProjectForm({ title: "", description: "", techStack: "", imageUrl: "", liveLink: "", githubLink: "" });
        setActiveModal(null);
      } else {
        alert("Failed to add project");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementForm)
      });
      if (res.ok) {
        const newAch = await res.json();
        setAchievements([newAch, ...achievements]);
        setAchievementForm({ title: "", description: "", date: "", iconUrl: "" });
        setActiveModal(null);
      } else {
        alert("Failed to add achievement");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding achievement");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAchievements(achievements.filter(a => a.id !== id));
      } else {
        alert("Failed to delete achievement");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your portfolio achievements and projects dynamically</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              View Live Site
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-full hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </header>

        {/* Resume Management — full width */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl mb-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl md:text-2xl font-bold">Resume</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Upload Area */}
            <label className="flex-1 cursor-pointer">
              <div className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                uploadingResume
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : resumeUploaded
                  ? "border-emerald-400/60 bg-emerald-500/10"
                  : "border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5"
              }`}>
                {uploadingResume ? (
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                ) : resumeUploaded ? (
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-500" />
                )}
                <div className="text-center">
                  <p className="font-semibold text-white text-sm">
                    {uploadingResume ? "Uploading..." : resumeUploaded ? "Resume Uploaded!" : "Click to upload Resume PDF"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF only · Max 5MB</p>
                </div>
              </div>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={uploadingResume}
              />
            </label>

            {/* Actions */}
            <div className="flex flex-col gap-3 min-w-[160px]">
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-all"
              >
                <FileText className="w-4 h-4" />
                View Current Resume
              </a>
              <button
                onClick={handleResumeDelete}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Remove Resume
              </button>
            </div>
          </div>

          {resumeError && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> {resumeError}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings (Col 1) */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl lg:col-span-1 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl md:text-2xl font-bold">Profile Settings</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              {/* Photo Preview & Upload */}
              <div className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl relative group">
                <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-3 relative overflow-hidden shadow-inner">
                  {profileForm.avatarUrl ? (
                    <img 
                      src={profileForm.avatarUrl} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-500" />
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer inline-flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                  <Upload className="w-3.5 h-3.5 mr-1" />
                  <span>Upload Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Name</label>
                <input 
                  required 
                  type="text" 
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                  placeholder="Amit Sharma" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Role/Tagline</label>
                <input 
                  required 
                  type="text" 
                  value={profileForm.role}
                  onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                  placeholder="CS Engineering" 
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="available"
                  checked={profileForm.available}
                  onChange={e => setProfileForm({ ...profileForm, available: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 bg-black/40 border border-white/10 focus:ring-blue-500 focus:ring-2 cursor-pointer" 
                />
                <label htmlFor="available" className="text-sm font-semibold text-gray-300 cursor-pointer select-none">Available for Hire</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 text-sm cursor-pointer shadow-lg shadow-blue-500/20"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Profile"}
              </button>
            </form>
          </div>

          {/* Projects and Achievements (Col 2 & 3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects Management */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl md:text-2xl font-bold">Projects</h2>
                </div>
                <button 
                  onClick={() => setActiveModal("project")}
                  className="flex items-center text-sm font-bold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add New
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {projects.length > 0 ? (
                  projects.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                      <div>
                        <h3 className="font-bold text-white text-base md:text-lg">{p.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 max-w-sm truncate">{p.description}</p>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {p.techStack.split(",").map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteProject(p.id)}
                        className="text-red-400 hover:text-red-300 p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500 text-sm">No projects found. Add one above to get started.</div>
                )}
              </div>
            </div>

            {/* Achievements Management */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <h2 className="text-xl md:text-2xl font-bold">Achievements</h2>
                </div>
                <button 
                  onClick={() => setActiveModal("achievement")}
                  className="flex items-center text-sm font-bold bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add New
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {achievements.length > 0 ? (
                  achievements.map((a) => (
                    <div key={a.id} className="flex justify-between items-center p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                      <div>
                        <h3 className="font-bold text-white text-base md:text-lg">{a.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{a.description}</p>
                        <div className="flex items-center text-[11px] text-purple-400 font-medium mt-2">
                          <Calendar className="w-3 h-3 mr-1" /> {a.date}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteAchievement(a.id)}
                        className="text-red-400 hover:text-red-300 p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500 text-sm">No achievements found. Add one above.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {activeModal === "project" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-extrabold text-white mb-6">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Project Title *</label>
                <input 
                  required 
                  type="text" 
                  value={projectForm.title}
                  onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  placeholder="e.g. AI Chatbot Interface" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Description *</label>
                <textarea 
                  required 
                  rows={3}
                  value={projectForm.description}
                  onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                  placeholder="Summarize the project's purpose and your role..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Tech Stack * (comma separated)</label>
                <input 
                  required 
                  type="text" 
                  value={projectForm.techStack}
                  onChange={e => setProjectForm({...projectForm, techStack: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  placeholder="e.g. Next.js, TypeScript, Tailwind" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Image URL (optional)</label>
                <input 
                  type="text" 
                  value={projectForm.imageUrl}
                  onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  placeholder="e.g. /images/proj1.jpg or external url" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Live Demo URL (optional)</label>
                  <input 
                    type="text" 
                    value={projectForm.liveLink}
                    onChange={e => setProjectForm({...projectForm, liveLink: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                    placeholder="https://..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">GitHub URL (optional)</label>
                  <input 
                    type="text" 
                    value={projectForm.githubLink}
                    onChange={e => setProjectForm({...projectForm, githubLink: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                    placeholder="https://github.com/..." 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 mt-6 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Save Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {activeModal === "achievement" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-extrabold text-white mb-6">Add New Achievement</h3>
            <form onSubmit={handleAddAchievement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Achievement Title *</label>
                <input 
                  required 
                  type="text" 
                  value={achievementForm.title}
                  onChange={e => setAchievementForm({...achievementForm, title: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                  placeholder="e.g. Winner at Smart India Hackathon" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Description *</label>
                <textarea 
                  required 
                  rows={3}
                  value={achievementForm.description}
                  onChange={e => setAchievementForm({...achievementForm, description: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none" 
                  placeholder="Explain what the achievement was..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Date * (Year or Month/Year)</label>
                <input 
                  required 
                  type="text" 
                  value={achievementForm.date}
                  onChange={e => setAchievementForm({...achievementForm, date: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                  placeholder="e.g. 2026 or Dec 2025" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Icon URL (optional)</label>
                <input 
                  type="text" 
                  value={achievementForm.iconUrl}
                  onChange={e => setAchievementForm({...achievementForm, iconUrl: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                  placeholder="e.g. /icons/trophy.svg" 
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 mt-6 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Save Achievement"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
