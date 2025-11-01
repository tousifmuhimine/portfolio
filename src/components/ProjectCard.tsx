'use client';

import { Github, ExternalLink } from 'lucide-react';

export interface Project {
  title: string;
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
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col h-full hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://placehold.co/600x400/1F2937/9CA3AF?text=Add+Screenshot';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {project.metrics && (
          <div className="mb-3 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium inline-block w-fit">
            📊 {project.metrics}
          </div>
        )}

        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-blue-400">
            Key Features:
          </h4>
          <ul className="space-y-1 text-gray-400 text-sm">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-4">
            <span className="font-semibold text-gray-400">Stack:</span>{' '}
            {project.techStack}
          </p>

          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all hover:scale-105"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-105"
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
