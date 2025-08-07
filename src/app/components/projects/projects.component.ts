import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      name: '3D Portfolio',
      description: 'A modern 3D portfolio website built with Three.js and Angular, featuring interactive 3D models and animations.',
      technologies: ['Angular', 'Three.js', 'TypeScript', 'SCSS'],
      github: 'https://github.com/yourusername/3d-portfolio',
      demo: 'https://yourusername.github.io/3d-portfolio'
    },
    {
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Angular', 'Stripe'],
      github: 'https://github.com/yourusername/ecommerce-platform'
    },
    {
      name: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'Firebase', 'Redux', 'Material-UI'],
      github: 'https://github.com/yourusername/task-management-app',
      demo: 'https://taskapp.yourdomain.com'
    },
    {
      name: 'Weather Dashboard',
      description: 'A weather application that displays current weather and forecast using a weather API.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'OpenWeather API'],
      github: 'https://github.com/yourusername/weather-dashboard',
      demo: 'https://weather.yourdomain.com'
    }
  ];

  ngOnInit(): void {
    // You can add any initialization logic here
  }
}
