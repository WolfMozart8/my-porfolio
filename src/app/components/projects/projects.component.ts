import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';
import { LanguageService } from '../../services/language.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

interface Project {
  id: string;
  en: {
    name: string;
    description: string;
  };
  es: {
    name: string;
    description: string;
  };
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface ProjectDisplay {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface ProjectsData {
  projects: Project[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: ProjectDisplay[] = [];
  private languageSubscription: Subscription;
  private projectsData: Project[] = [];

  constructor(
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.updateProjectsLanguage();
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadProjects(): void {
    this.http.get<ProjectsData>('assets/data/projects.json').subscribe({
      next: (data) => {
        this.projectsData = data.projects;
        this.updateProjectsLanguage();
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  private updateProjectsLanguage(): void {
    if (!this.projectsData) return;
    
    const currentLang = this.languageService.getCurrentLanguage();
    this.projects = this.projectsData.map(project => ({
      name: project[currentLang].name,
      description: project[currentLang].description,
      technologies: [...project.technologies],
      github: project.github,
      demo: project.demo,
      image: project.image
    }));
  }
}
