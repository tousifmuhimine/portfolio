'use client';

import Header from '../components/Header';
import ProjectCard, { Project } from '../components/ProjectCard';
import FloatingElements from '../components/FloatingElements';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

const projectsData: Project[] = [
  {
    title: "🌊 Flood Forecasting Chatbot",
    techStack: "Python, LangChain, Gemma2:2B, Scikit-learn, Node.js, Visual Crossing API, MongoDB",
    description: "A hybrid AI chatbot for real-time flood forecasting. Uses a custom-trained ML model for core predictions and Gemma2:2B for natural language interface.",
    highlights: [
      "Hybrid AI: ML model for forecasting + LLM for conversation",
      "LLM reasoning integrated with live weather data",
      "Validates forecasts using training dataset references",
      "Built for reliability and easy web deployment"
    ],
    imageUrl: "/images/projects/flood-chatbot.png",
    metrics: "90% accuracy in flood prediction",
    githubUrl: "https://github.com/tousifmuhimine/Flood-Forecasting-BD",
    
  },
  {
    title: "⚛️ Physics Chatbot",
    techStack: "Python, LLaMA-Factory, LangChain, Node.js, React",
    description: "An intelligent assistant designed to solve and explain physics problems with custom fine-tuned LLM for conceptual and numeric reasoning.",
    highlights: [
      "Custom fine-tuned LLM trained via LLaMA-Factory",
      "Node.js-powered API for fast, scalable inference",
      "Step-by-step derivation explanations",
      "Built for educational platforms"
    ],
    imageUrl: "/images/projects/physics-chatbot.png",
    metrics: "Handles 500+ physics concepts",
    githubUrl: "https://github.com/tousifmuhimine/Physics-Chatbot"
  },
  {
    title: "📚 Bouncy Book Store",
    techStack: "React, Node.js, Express, MongoDB",
    description: "A responsive full-stack bookstore with dynamic cart management, product search, and authentication.",
    highlights: [
      "Secure JWT-based authentication",
      "Modular Node.js API with database flexibility",
      "Smooth, minimal React interface",
      "Real-time cart and inventory management"
    ],
    imageUrl: "/images/projects/bouncy-bookstore.png",
    metrics: "Built for 1000+ concurrent users",
    liveUrl: "https://bouncybookstore.vercel.app/",
    githubUrl: "https://github.com/tousifmuhimine/bouncy--bookstore"
  },
  {
    title: "🧩 Data Structure Learning LLM",
    techStack: "Python, LangChain, Node.js, React, MongoDB",
    description: "An AI-powered DSA tutor that teaches and visualizes algorithms interactively with natural language explanations.",
    highlights: [
      "LLM explains code, logic, and algorithm behavior",
      "Real-time visualization of data structures",
      "Interactive learning experience",
      "Covers stack, queue, tree, and graph operations"
    ],
    imageUrl: "/images/projects/dsa-learning.png",
    metrics: "Used by 200+ students",
    githubUrl: "https://github.com/tousifmuhimine/data-structure-ai",
    liveUrl: "https://dsa-chatbot-demo.vercel.app"  //have to change it later
  }
];

const skills = {
  "AI & ML": ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
  "Web Development": ["HTML", "CSS", "JavaScript", "TypeScript", "React.js"],
  "Frameworks & Tools": ["Node.js", "Express", "Next.js", "LangChain", "LangGraph", "Streamlit"],
  "Databases": ["MongoDB", "Supabase", "PostgreSQL", "SQL"],
  "Cloud & DevOps": ["Vercel", "Render", "Git", "GitHub"]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      <FloatingElements />
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* Hero / About Section */}
        <section id="about" className="min-h-screen flex flex-col md:flex-row items-center justify-center py-24 scroll-mt-20 gap-12">
          
          {/* Left - AI Developer */}
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                AI Developer
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Specializing in Machine Learning, Deep Learning & LLMs
            </p>
            <p className="text-gray-300">
              Building intelligent systems powered by cutting-edge AI models. Expert in Python for model development, fine-tuning LLMs, and creating AI reasoning pipelines.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:scale-110 transition-transform cursor-pointer">
                TensorFlow
              </span>
              <span className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30 hover:scale-110 transition-transform cursor-pointer">
                PyTorch
              </span>
              <span className="px-4 py-2 bg-pink-600/20 text-pink-400 rounded-full text-sm font-medium border border-pink-500/30 hover:scale-110 transition-transform cursor-pointer">
                LangChain
              </span>
            </div>
          </div>

          {/* Center - Profile */}
          <div className="flex-1 flex flex-col items-center relative">
            <div className="relative w-72 h-72 md:w-80 md:h-80 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl shadow-blue-500/50 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl text-white">
                <img 
                  src="/images/profile-photo.jpg" 
                  alt="Abdullah Al Muhimine"
                  className="w-full h-full object-cover"
  />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping-slow"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 text-center">
              Abdullah Al Muhimine
            </h1>
            <p className="text-lg text-gray-400 mb-2 text-center">(Tousif)</p>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/tousifmuhimine" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all hover:scale-110">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/tousifmuhimine" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right - Full Stack Engineer */}
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent">
                Full-Stack Engineer
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Crafting scalable web applications with modern tech
            </p>
            <p className="text-gray-300">
              Building dynamic backends and interactive frontends with Node.js, React, and Next.js. Connecting AI models to polished web applications.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30 hover:scale-110 transition-transform cursor-pointer">
                Node.js
              </span>
              <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:scale-110 transition-transform cursor-pointer">
                React
              </span>
              <span className="px-4 py-2 bg-gray-600/20 text-gray-300 rounded-full text-sm font-medium border border-gray-500/30 hover:scale-110 transition-transform cursor-pointer">
                Next.js
              </span>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                My Story
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I started my journey in AI fascinated by how machines could learn and reason. Today, I bridge the gap between cutting-edge AI research and real-world applications. My goal is simple: build intelligent systems that actually solve problems and make people's lives easier.
            </p>
            <p className="text-gray-400">
              When I'm not coding, I'm exploring new AI papers, contributing to open-source, or helping students learn data structures and algorithms.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 scroll-mt-20">
          <h2 className="text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Real-world applications that combine AI intelligence with practical usability
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 scroll-mt-20">
          <h2 className="text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12">
            A blend of AI, web, and full-stack development expertise
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(skills).map(([category, skillList]) => (
              <div
                key={category}
                className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{category}</h3>
                <ul className="space-y-2 text-gray-300">
                  {skillList.map((skill) => (
                    <li key={skill} className="hover:text-blue-300 transition-colors">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 scroll-mt-20">
          <h2 className="text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Have a project in mind? Let's build something amazing together
          </p>
          <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
            <div className="space-y-6">
              <a
                href="mailto:abdullahtsn13@gmail.com"
                className="flex items-center gap-4 text-lg hover:text-blue-400 transition-all group"
              >
                <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-600 transition-all group-hover:scale-110">
                  <Mail size={24} />
                </div>
                <span className="group-hover:translate-x-2 transition-transform">
                  abdullahtsn13@gmail.com
                </span>
              </a>

              <a
                href="https://github.com/tousifmuhimine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg hover:text-blue-400 transition-all group"
              >
                <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-600 transition-all group-hover:scale-110">
                  <Github size={24} />
                </div>
                <span className="group-hover:translate-x-2 transition-transform">
                  github.com/tousifmuhimine
                </span>
              </a>

              <a
                href="linkedin.com/in/tousifmuhimine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg hover:text-blue-400 transition-all group"
              >
                <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-600 transition-all group-hover:scale-110">
                  <Linkedin size={24} />
                </div>
                <span className="group-hover:translate-x-2 transition-transform">
                  linkedin.com/in/tousifmuhimine
                </span>
              </a>

              <div className="flex items-center gap-4 text-lg text-gray-400">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <MapPin size={24} />
                </div>
                <span>Bangladesh</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-gray-500 border-t border-gray-800/50 mt-16 relative z-10">
        <p>&copy; {new Date().getFullYear()} Abdullah Al Muhimine (Tousif). All rights reserved.</p>
      </footer>
    </div>
  );
}
