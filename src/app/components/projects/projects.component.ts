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
  displayedProjects: ProjectDisplay[] = [];
  private languageSubscription: Subscription;
  private projectsData: Project[] = [];
  private readonly projectsPerPage = 4;
  private currentPage = 1;
  showLoadMore = true;

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
    const lang = this.languageService.getCurrentLanguage() as 'en' | 'es';
    this.projects = this.projectsData.map(project => {
      const { en, es, ...rest } = project;
      const langData = lang === 'en' ? en : es;
      return {
        ...langData,
        technologies: project.technologies,
        github: project.github,
        demo: project.demo,
        image: project.image
      };
    });
    this.updateDisplayedProjects();
  }

  loadMoreProjects(): void {
    this.currentPage++;
    this.updateDisplayedProjects();
  }

  private updateDisplayedProjects(): void {
    const endIndex = this.currentPage * this.projectsPerPage;
    this.displayedProjects = this.projects.slice(0, endIndex);
    this.showLoadMore = endIndex < this.projects.length;
  }
}
