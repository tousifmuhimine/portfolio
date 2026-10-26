'use client';

import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TechMarquee from '../components/TechMarquee';
import ScrollStorySection from '../components/ScrollStorySection';
import RolesSection from '../components/RolesSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ResumesSection from '../components/ResumesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Preloader from '../components/Preloader';
import CommandPalette from '../components/CommandPalette';
import TelemetryHUD from '../components/TelemetryHUD';
import { Project } from '../components/ProjectCard';
import {
  BrainCircuit,
  Sparkles,
  Network,
  TerminalSquare,
  Code2,
  Database,
} from 'lucide-react';

const resumeTracks = [
  {
    label: 'AF Resume',
    title: 'AI Full-Stack Allrounder',
    href: '/resumeAF.pdf',
    tone: 'Systems, AI products, backend, frontend, deployment',
    summary:
      'Best for roles that need one engineer who can connect LLM reasoning, production web apps, APIs, databases, and deployment.',
  },
  {
    label: 'Resume A',
    title: 'AI Engineer',
    href: '/others/resumeA.pdf',
    tone: 'LLMs, RAG, multi-agent systems, model evaluation',
    summary:
      'Focused on LangChain, LangGraph, Ollama, fine-tuning, PGVector retrieval, and AI application workflows.',
  },
  {
    label: 'Resume F',
    title: 'Full-Stack / Backend Engineer',
    href: '/others/resumeF.pdf',
    tone: 'Node.js, FastAPI, REST APIs, auth, databases',
    summary:
      'Built for backend and full-stack roles involving React, Next.js, Supabase, PostgreSQL, JWT auth, and API security.',
  },
  {
    label: 'Resume M',
    title: 'ML / DL Engineer',
    href: '/others/resumeM.pdf',
    tone: 'ML, deep learning, research, model validation',
    summary:
      'Highlights supervised learning, feature engineering, CNNs, sequence modeling, multimodal learning, and research methods.',
  },
];

const projectsData: Project[] = [
  {
    title: 'PorteHobe AI',
    category: 'Capstone AI Reasoning',
    techStack: 'Gemma 3:4B, Ollama, LangGraph, GSM8K, Python, LLM fine-tuning',
    description:
      'A math reasoning AI capstone built around open-source LLM refinement, benchmark-driven evaluation, and task-specialized reasoning workflows.',
    highlights: [
      'Fine-tuned Gemma 3:4B with supervised instruction tuning for mathematical reasoning.',
      'Benchmarked against Mathstral and Gemini-style baselines with GSM8K evaluation.',
      'Improved reasoning accuracy by 15% through dataset curation and model refinement.',
    ],
    imageUrl: '/images/projects/physics-chatbot.png',
    metrics: '15% reasoning accuracy gain',
    githubUrl: 'https://github.com/tousifmuhimine',
  },
  {
    title: 'Data Structure Learning LLM',
    category: 'AI Education Platform',
    techStack: 'Python, FastAPI, LangGraph, MCP Server, Supabase, PGVector, TypeScript',
    description:
      'An AI-powered DSA tutor that explains code, visualizes algorithms, and serves context-aware educational content from a backend-first architecture.',
    highlights: [
      'Built LLM reasoning workflows with LangGraph and MCP Server.',
      'Designed APIs for context-aware query handling and vector-based retrieval.',
      'Created interactive learning flows for algorithms and data structures.',
    ],
    imageUrl: '/images/projects/dsa-learning.png',
    metrics: 'LLM tutor with retrieval memory',
    githubUrl: 'https://github.com/tousifmuhimine/data-structure-ai',
    liveUrl: 'https://data-structure-ai.vercel.app/',
  },
  {
    title: 'Bouncy Book Store',
    category: 'Full-Stack E-commerce',
    techStack: 'React, Next.js, Node.js, TypeScript, Supabase, PostgreSQL, JWT',
    description:
      'A full-stack bookstore with role-aware access, authentication, cart flows, inventory-aware data, and a polished responsive storefront.',
    highlights: [
      'Architected the application with React, Node.js, and Supabase PostgreSQL.',
      'Designed REST APIs with JWT authentication and role-aware access control.',
      'Connected product, cart, and inventory workflows across frontend and backend.',
    ],
    imageUrl: '/images/projects/bouncy-bookstore.png',
    metrics: 'Secure commerce workflow',
    liveUrl: 'https://bouncybookstore.vercel.app/',
    githubUrl: 'https://github.com/tousifmuhimine/bouncy--bookstore',
  },
  {
    title: 'Flood Forecasting AI System',
    category: 'ML + Conversational AI',
    techStack: 'Python, Streamlit, LangChain, Scikit-learn, Gemma2:2B, JSON datasets',
    description:
      'A hybrid flood forecasting system that combines supervised ML prediction with conversational LLM explanations for user-facing insight.',
    highlights: [
      'Developed a predictive model with time-series forecasting and 90% accuracy.',
      'Engineered features from localized environmental datasets for prediction stability.',
      'Integrated forecast outputs with an explanation engine and visual interface.',
    ],
    imageUrl: '/images/projects/flood-chatbot.png',
    metrics: '90% flood prediction accuracy',
    githubUrl: 'https://github.com/tousifmuhimine/Flood-Forecasting-BD',
  },
  {
    title: 'Physics RAG Chatbot',
    category: 'Retrieval-Augmented Assistant',
    techStack: 'Python, Streamlit, LangChain, PGVector, Hugging Face embeddings',
    description:
      'A physics assistant that uses semantic retrieval before answering, reducing hallucinations and grounding explanations in relevant context.',
    highlights: [
      'Developed a RAG system using vector search for context-grounded reasoning.',
      'Reduced hallucinations through retrieval-first answering logic.',
      'Built structured workflows for physics problem explanation and follow-up answers.',
    ],
    imageUrl: '/images/projects/physics-chatbot.png',
    metrics: 'Retrieval-first reasoning',
    githubUrl: 'https://github.com/tousifmuhimine/Physics-Chatbot',
  },
  {
    title: 'Multimodal Sentiment Analysis',
    category: 'Deep Learning Research',
    techStack: 'Python, PyTorch, TensorFlow, CNNs, sequence modeling, video preprocessing',
    description:
      'A deep learning research project for detecting emotional sentiment from image and video inputs with refined temporal preprocessing.',
    highlights: [
      'Architected CNN-based and sequence models for multimodal sentiment detection.',
      'Engineered temporal data preprocessing pipelines for video-based features.',
      'Evaluated model behavior across image and sequence representations.',
    ],
    imageUrl: '/images/projects/flood-chatbot.png',
    metrics: 'Image + video emotion modeling',
    githubUrl: 'https://github.com/tousifmuhimine',
  },
];

const skills = [
  {
    title: 'LLMs & GenAI',
    icon: BrainCircuit,
    items: ['RAG', 'Multi-agent systems', 'Agent orchestration', 'LLM integration', 'Reasoning evaluation', 'GSM8K'],
  },
  {
    title: 'ML & Deep Learning',
    icon: Sparkles,
    items: ['Supervised learning', 'Feature engineering', 'CNNs', 'Sequence modeling', 'Multimodal learning', 'Scikit-learn'],
  },
  {
    title: 'Frameworks',
    icon: Network,
    items: ['LangChain', 'LangGraph', 'Ollama', 'TensorFlow', 'PyTorch', 'Streamlit'],
  },
  {
    title: 'Backend',
    icon: TerminalSquare,
    items: ['Node.js', 'FastAPI', 'Django', 'REST APIs', 'JWT authentication', 'API security'],
  },
  {
    title: 'Frontend',
    icon: Code2,
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    title: 'Data & Tools',
    icon: Database,
    items: ['Supabase', 'PGVector', 'PostgreSQL', 'MySQL', 'MongoDB', 'Git/GitHub'],
  },
];

const education = [
  {
    school: 'North South University',
    detail: 'B.Sc. in Computer Science and Engineering',
    meta: '2021-2025 | CGPA 3.44 | AI and Machine Learning track',
  },
];

const experience = [
  {
    company: 'Cognisor AI',
    role: 'AI Engineer Intern',
    time: 'June 2026 – Present',
    place: 'Dhaka',
    bullets: [
      'Engineering and evaluating AI workflows, LLM agents, and retrieval-augmented generation (RAG) systems.',
      'Integrating model reasoning pipelines, prompt architectures, and context-aware services.',
    ],
  },
  {
    company: 'Fleek BD',
    role: 'Software Developer',
    time: '2 months',
    place: 'Dhaka',
    bullets: [
      'Contributed to web development, responsive user interfaces, and API integrations.',
      'Assisted in platform feature rollouts, frontend performance optimization, and codebase maintenance.',
    ],
  },
  {
    company: 'FabricoMartBD',
    role: 'Full-Stack Developer',
    time: 'Dec 2025 – April 2026',
    place: 'Dhaka',
    bullets: [
      'Built the admin dashboard for internal business operations.',
      'Developed and deployed CMS web platforms and supporting infrastructure for an international brand launch.',
    ],
  },
];

const stats: [string, string][] = [
  ['6+', 'AI & full-stack systems'],
  ['15%', 'LLM reasoning accuracy gain'],
  ['90%', 'Flood model accuracy'],
  ['3.44', 'CSE CGPA (AI/ML track)'],
];

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-transparent text-[#ecebe6] selection:bg-[#3df5ff]/30 selection:text-white">
      {/* Boot Preloader Sequence */}
      <Preloader />

      {/* Engineered Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <Header onOpenPalette={() => setPaletteOpen(true)} />

      {/* Main Content */}
      <main>
        <HeroSection stats={stats} />
        <TechMarquee />
        <ScrollStorySection />
        <RolesSection tracks={resumeTracks} />
        <ProjectsSection projects={projectsData} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} education={education} />
        <ResumesSection tracks={resumeTracks} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Live System Telemetry HUD */}
      <TelemetryHUD onOpenPalette={() => setPaletteOpen(true)} />

      {/* Raycast-style Command Palette (⌘K) */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
