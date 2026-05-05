'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

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

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article className="project-card reveal-up" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="project-image">
        <Image src={project.imageUrl} alt={`${project.title} screenshot`} width={900} height={620} />
        <span>{project.category}</span>
      </div>

      <div className="project-body">
        <div>
          <p className="project-metric">{project.metrics}</p>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>

        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <p className="project-stack">{project.techStack}</p>

        <div className="project-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
              <ExternalLink size={17} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
              <Github size={17} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
