'use client';

import Image from 'next/image';
import Header from '../components/Header';
import ProjectCard, { Project } from '../components/ProjectCard';
import FloatingElements from '../components/FloatingElements';
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Sparkles,
  TerminalSquare,
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
  {
    school: 'National Ideal College',
    detail: 'Higher Secondary Certificate (HSC)',
    meta: '2018-2020 | GPA 5.00',
  },
  {
    school: 'Mohanogor Ideal School',
    detail: 'Secondary School Certificate (SSC)',
    meta: '2016-2018 | GPA 5.00',
  },
];

const experience = [
  {
    company: 'FabricoMartBD',
    role: 'Full-Stack Developer',
    time: 'Dec 2025-April 2026',
    place: 'Dhaka',
    bullets: [
      'Built the admin dashboard for internal business operations.',
      'Developed and deployed CMS web platforms and supporting infrastructure for an international brand launch.',
    ],
  },
];

const stats = [
  ['6+', 'AI and full-stack projects'],
  ['15%', 'LLM reasoning accuracy gain'],
  ['90%', 'Flood model accuracy'],
  ['3.44', 'CSE CGPA'],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100">
      <FloatingElements />
      <Header />

      <main>
        <section id="about" className="hero-shell section-pad scroll-mt-24">
          <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8">
            <div className="reveal-up max-w-3xl">
              <div className="eyebrow">
                <span className="live-dot" />
                Available for AI, ML, and full-stack roles
              </div>
              <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight text-white md:text-7xl">
                Abdullah Al Muhimine
                <span className="block text-slate-400">(Tousif)</span>
              </h1>
              <div className="typing-line mt-6" aria-label="AI full-stack engineer typing animation">
                <span>AI Full-Stack Engineer</span>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                I build practical intelligent systems: LLM agents, retrieval pipelines, ML models, secure APIs,
                and product-grade web applications. My strongest lane is turning AI ideas into usable software
                with clean interfaces and reliable backend logic.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="primary-action">
                  View projects
                  <ArrowUpRight size={18} />
                </a>
                <a href="#resumes" className="secondary-action">
                  Download resumes
                  <Download size={18} />
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div className="metric-tile" key={label}>
                    <span>{value}</span>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-up delay-1 hero-portrait-wrap">
              <div className="portrait-frame">
                <Image
                  src="/images/profile-photo.png"
                  alt="Abdullah Al Muhimine"
                  width={780}
                  height={780}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="role-console">
                <div className="console-top">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="font-mono text-sm text-emerald-300">tousif@portfolio:~$</p>
                <p className="mt-2 text-sm text-slate-300">
                  shipping AI reasoning systems, retrieval apps, and full-stack products from Dhaka.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="section-pad scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="section-heading">
              <p>Four ways to read my profile</p>
              <h2>Same engineer, different role focus.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {resumeTracks.map((track, index) => (
                <article className="track-card reveal-up" style={{ animationDelay: `${index * 90}ms` }} key={track.title}>
                  <span>{track.label}</span>
                  <h3>{track.title}</h3>
                  <p>{track.summary}</p>
                  <small>{track.tone}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-pad scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="section-heading">
              <p>Selected work</p>
              <h2>AI systems with real application layers.</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projectsData.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="section-heading">
              <p>Resume-backed toolkit</p>
              <h2>Skills across AI, ML, backend, and product UI.</h2>
            </div>
            <div className="skills-grid">
              {skills.map(({ title, icon: Icon, items }) => (
                <article className="skill-panel" key={title}>
                  <div className="skill-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <div className="skill-tags">
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-pad scroll-mt-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
            <div className="section-heading sticky-heading">
              <p>Foundation</p>
              <h2>Experience and education from the resumes.</h2>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={item.company}>
                  <div className="timeline-dot" />
                  <div>
                    <span>{item.time} | {item.place}</span>
                    <h3>{item.role} - {item.company}</h3>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
              {education.map((item) => (
                <article className="timeline-item" key={item.school}>
                  <div className="timeline-dot education-dot">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <span>{item.meta}</span>
                    <h3>{item.school}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resumes" className="section-pad scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="resume-band">
              <div>
                <div className="eyebrow">
                  <Layers3 size={16} />
                  Resume library
                </div>
                <h2>Download the version that matches the role.</h2>
                <p>
                  The portfolio presents you as one complete builder, while the downloads let recruiters choose
                  the AI, full-stack, or ML/DL angle immediately.
                </p>
              </div>
              <div className="resume-list">
                {resumeTracks.map((resume) => (
                  <a href={resume.href} download className="resume-link" key={resume.href}>
                    <span>
                      <strong>{resume.title}</strong>
                      <small>{resume.label}</small>
                    </span>
                    <Download size={19} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad scroll-mt-24">
          <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
            <p className="eyebrow mx-auto w-fit">Let&apos;s connect</p>
            <h2 className="mt-5 text-4xl font-semibold text-white md:text-6xl">
              Have an AI product, model, or backend that needs to become real?
            </h2>
            <div className="contact-actions">
              <a href="mailto:abdullahtsn13@gmail.com">
                <Mail size={19} />
                abdullahtsn13@gmail.com
              </a>
              <a href="https://github.com/tousifmuhimine" target="_blank" rel="noopener noreferrer">
                <Github size={19} />
                GitHub
              </a>
              <a href="https://linkedin.com/in/tousifmuhimine" target="_blank" rel="noopener noreferrer">
                <Linkedin size={19} />
                LinkedIn
              </a>
              <span>
                <MapPin size={19} />
                Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        Copyright {new Date().getFullYear()} Abdullah Al Muhimine (Tousif). Built for AI, ML, and full-stack roles.
      </footer>
    </div>
  );
}
