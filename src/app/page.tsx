import Header from '../components/Header';
import ProjectCard, { Project } from '../components/ProjectCard';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

// Your project data, updated with new fields
const projectsData: Project[] = [
  {
    title: "🌊 Flood Forecasting Chatbot",
    techStack: "Python, LangChain, Gemma2:2B, Scikit-learn (.pkl model), Node.js, Visual Crossing API, MongoDB/Supabase",
    description: "A hybrid AI chatbot for real-time flood forecasting. Uses a custom-trained ML model (.pkl) for core predictions and Gemma2:2B (via LangChain) for a natural language interface to interpret results and handle user conversation. Integrates live weather data from Visual Crossing API.",
    highlights: [
      "Hybrid AI: Uses a .pkl model for forecasting & LLM for conversation.",
      "LLM reasoning integrated with live weather data.",
      "Validates forecasts using training dataset references.",
      "Built for reliability and easy web deployment."
    ],
    imageUrl: "/images/flood-chatbot-ss.png", // IMPORTANT: Add this image to your /public/images folder
    githubUrl: "https://github.com/tousif-muhimine/your-repo-link" // TODO: Replace this
  },
  {
    title: "⚛️ Physics Chatbot",
    techStack: "Python, LLaMA-Factory, LangChain, Node.js API, React frontend",
    description: "An intelligent assistant designed to solve and explain physics problems. Fine-tuned for both conceptual and numeric reasoning, capable of explaining derivations step-by-step.",
    highlights: [
      "Custom fine-tuned LLM trained via LLaMA-Factory.",
      "Node.js-powered API for fast, scalable inference.",
      "Built for educational platforms or self-study assistance."
    ],
    imageUrl: "/images/physics-chatbot-ss.png", // IMPORTANT: Add this image to your /public/images folder
    githubUrl: "https://github.com/tousif-muhimine/your-repo-link" // TODO: Replace this
  },
  {
    title: "📚 Bouncy Book Store Website",
    techStack: "React, Node.js, Express, MongoDB",
    description: "A responsive full-stack bookstore with dynamic cart management, product search, and authentication. Focused on performance, clean UI, and real-world usability.",
    highlights: [
      "Secure JWT-based authentication.",
      "Modular Node.js API with database flexibility.",
      "Smooth, minimal React interface for users."
    ],
    imageUrl: "/images/bouncy-bookstore-ss.png", // IMPORTANT: Add this image to your /public/images folder
    liveUrl: "https://bouncy-book-store.example.com", // TODO: REPLACE with your actual deployed link
    githubUrl: "https://github.com/tousif-muhimine/your-repo-link" // TODO: Replace this
  },
  {
    title: "🧩 Data Structure Learning LLM",
    techStack: "Python, LangChain, Node.js, React, Supabase/MongoDB",
    description: "An AI-powered DSA tutor that teaches and visualizes algorithms interactively. Explains stack/queue/tree/graph operations using natural language and real-time visualization.",
    highlights: [
      "LLM explains code, logic, and algorithm behavior step-by-step.",
      "Node.js API connects reasoning engine to UI visualization.",
      "Designed for student engagement and interactive learning."
    ],
    imageUrl: "/images/dsa-llm-ss.png", // IMPORTANT: Add this image to your /public/images folder
    githubUrl: "https://github.com/tousif-muhimine/your-repo-link" // TODO: Replace this
  }
];

// Your skills data
const skills = {
  "AI & ML Tools": ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "LangChain", "LLaMA-Factory", "Ollama", "Gemma2"],
  "Web Stack": ["Node.js", "Express", "React.js", "Next.js", "TypeScript", "JavaScript"],
  "Databases": ["MongoDB", "Supabase", "PostgreSQL", "SQL"],
  "Cloud & DevOps": ["Vercel", "Render", "MCP Server", "Git/GitHub"],
  "Others": ["REST APIs", "Data Visualization", "JSON pipelines", "Fine-tuning workflows"]
};
// ... skills object ...

const skillColors: Record<string, string> = {
  Python: "bg-blue-600",
  TensorFlow: "bg-orange-500",
  PyTorch: "bg-red-500",
  "Scikit-learn": "bg-yellow-500",
  OpenCV: "bg-green-500",
  LangChain: "bg-purple-600",
  "LLaMA-Factory": "bg-pink-600",
  Ollama: "bg-cyan-600",
  Gemma2: "bg-indigo-500",
  "Node.js": "bg-green-600",
  React: "bg-blue-500",
  "Next.js": "bg-gray-700",
  MongoDB: "bg-emerald-600",
  Supabase: "bg-teal-500",
  PostgreSQL: "bg-sky-600",
  SQL: "bg-indigo-600",
  Vercel: "bg-gray-800",
  Render: "bg-orange-600",
  "MCP Server": "bg-slate-500",
  Git: "bg-red-600",
  GitHub: "bg-gray-700",
};


export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-primary-text">
      <Header />
      
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Hero/About Section */}
        <section id="about" className="mb-16 md:mb-24 scroll-mt-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hi, I’m Abdullah Al Muhimine (Tousif)</h1>
          <h2 className="text-2xl md:text-3xl font-medium text-accent mb-6">AI Developer & Full-Stack Engineer</h2>
          <p className="text-lg text-secondary-text mb-4">
            I build real-world intelligent systems powered by Machine Learning, Deep Learning, and LLMs.
          </p>
          <p className="text-lg text-secondary-text mb-4">
            I specialize in Python for model development and Node.js for building dynamic backends and web interfaces. My projects often connect AI reasoning pipelines (via LangChain, custom fine-tuning, and real-time APIs) to interactive frontends built with React or Next.js.
          </p>
          <p className="text-lg text-secondary-text">
            I use databases like MongoDB, Supabase, and SQL, and occasionally implement MCP servers for process communication or workflow control. My goal is to bridge the gap between AI research and real-world usability — turning models into polished applications that actually solve problems.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16 md:mb-24 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-accent">🚀 Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap for better spacing */}
            {projectsData.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16 md:mb-24 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-accent">🧠 Skills</h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className={`skill-pill ${skillColors[skill] || "bg-gray-700"} hover:scale-110 transition-transform`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-accent">📬 Contact</h2>
          <div className="space-y-4">
            <a href="mailto:abdullah.muhimine@gmail.com" className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
              <Mail size={24} />
              <span>abdullah.muhimine@gmail.com</span>
            </a>
            <a href="https://github.com/tousif-muhimine" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
              <Github size={24} />
              <span>github.com/tousif-muhimine</span>
            </a>
            <a href="https://linkedin.com/in/tousif-muhimine" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
              <Linkedin size={24} />
              <span>linkedin.com/in/tousif-muhimine</span>
            </a>
             <div className="flex items-center gap-3 text-lg text-secondary-text">
              <MapPin size={24} />
              <span>Bangladesh</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center p-8 text-secondary-text border-t border-gray-700 mt-16">
        <p>&copy; {new Date().getFullYear()} Abdullah Al Muhimine (Tousif). All rights reserved.</p>
      </footer>
    </div>
  );
}


