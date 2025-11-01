'use client';

import { ArrowUpRight, Github } from 'lucide-react';

export interface Project {
  title: string;
  techStack: string;
  description: string;
  highlights: string[];
  imageUrl: string; // Added for screenshots
  liveUrl?: string; // Optional: for live demo link
  githubUrl?: string; // Optional: for GitHub repo link
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 flex flex-col justify-between overflow-hidden">
      
      {/* Project Image */}
      <img 
        src={project.imageUrl} 
        alt={`${project.title} screenshot`} 
        className="w-full h-48 object-cover object-center"
        onError={(e) => {
          // Fallback placeholder
          (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1F2937/9CA3AF?text=Project+Image";
        }}
      />

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-3">
            {project.title}
          </h3>
          <p className="text-secondary-text mb-4 text-sm">{project.description}</p>
          
          <h4 className="text-sm font-semibold mb-2">Highlights:</h4>
          <ul className="list-disc list-inside space-y-1 mb-4 text-secondary-text text-sm">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Tech Stack:</h4>
          <p className="text-xs text-secondary-text opacity-80 mb-6">{project.techStack}</p>

          {/* Project Links */}
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-accent text-primary-text hover:bg-blue-700 transition-colors"
              >
                <ArrowUpRight size={16} />
                Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gray-600 text-primary-text hover:bg-gray-700 transition-colors"
              >
                <Github size={16} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

