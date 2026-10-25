'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

export interface Project {
  title: string;
  category: string;
  techStack: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const highlightVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const highlightItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      {/* Image */}
      <div className="project-image">
        <Image
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          width={900}
          height={620}
          loading="lazy"
        />
        <span className="category-badge">{project.category}</span>
      </div>

      {/* Body */}
      <div className="project-body">
        <div>
          <p className="project-metric">{project.metrics}</p>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>

        <motion.ul
          variants={highlightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          {project.highlights.map((highlight) => (
            <motion.li key={highlight} variants={highlightItem}>
              {highlight}
            </motion.li>
          ))}
        </motion.ul>

        <p className="project-stack">{project.techStack}</p>

        <div className="project-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
              <ExternalLink size={16} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
              <Github size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
