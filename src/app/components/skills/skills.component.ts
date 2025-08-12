import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

export interface SkillTag {
  name: string;
  class: string;
}

export interface Skill {
  name: string;
  level?: number;
  icon?: string;
  tags: SkillTag[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface SkillsData {
  skillCategories: SkillCategory[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  terminalOutput = '';
  showTerminalOutput = false;
  activeCategory = '';
  skillCategories: SkillCategory[] = [];
  filteredSkills: Skill[] = [];
  private dataSubscription?: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSkills();
    
    // Simulate loading animation
    const loadingText = 'Initializing skills matrix...\nLoading skill categories...\nProcessing skill data...\nDone!\n\n';
    let i = 0;
    const loadingInterval = setInterval(() => {
      if (i < loadingText.length) {
        this.terminalOutput += loadingText.charAt(i);
        i++;
      } else {
        clearInterval(loadingInterval);
        setTimeout(() => {
          this.showTerminalOutput = true;
        }, 500);
      }
    }, 12);
  }
  
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
  
  private loadSkills(): void {
    console.log('Loading skills data...');
    this.dataSubscription = this.http.get<SkillsData>('assets/data/skills.json').subscribe({
      next: (data) => {
        console.log('Skills data loaded:', data);
        this.skillCategories = data.skillCategories;
        console.log('Skill categories set:', this.skillCategories);
        
        // Set the first category as active if not set
        if (this.skillCategories.length > 0) {
          if (!this.activeCategory) {
            // this.activeCategory = this.skillCategories[0].name;
            this.activeCategory = "all";
          }
          this.updateFilteredSkills();
          console.log('Active category set to:', this.activeCategory);
        } else {
          console.warn('No skill categories found in the data');
        }
      },
      error: (error) => {
        console.error('Error loading skills data:', error);
      },
      complete: () => {
        console.log('Skills data loading completed');
      }
    });
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.updateFilteredSkills();
    // this.showTerminalOutput = false;
    // Optional: Add sound effect here for better UX
  }
  
  private updateFilteredSkills(): void {
    if (!this.activeCategory) {
      this.filteredSkills = [];
      return;
    }
    
    if (this.activeCategory === "all") {
      const foundSkills: Skill[] = [];
      this.skillCategories.forEach(cat => {
        if (cat.name !== "languages") {
          foundSkills.push(...cat.skills);
        }
      });
      
      // Return all skills
      this.filteredSkills = [...foundSkills];
      return;
    }
    
    const category = this.skillCategories.find(cat => cat.name === this.activeCategory);
    this.filteredSkills = category ? [...category.skills] : [];
  }
  
  getActiveSkills(): Skill[] {
    if (!this.activeCategory) return [];
    return this.filteredSkills;
  }

  // Generate random tags for a skill
  private generateRandomTags(count: number): {name: string, class: string}[] {
    const allTags = [
      {name: 'Web Development', class: 'tag-web'},
      {name: 'Mobile', class: 'tag-mobile'},
      {name: 'Cloud', class: 'tag-cloud'},
      {name: 'DevOps', class: 'tag-devops'},
      {name: 'UI/UX', class: 'tag-ui'},
      {name: 'Testing', class: 'tag-testing'},
      {name: 'Performance', class: 'tag-perf'},
      {name: 'Security', class: 'tag-security'},
      {name: 'APIs', class: 'tag-api'},
      {name: 'Microservices', class: 'tag-micro'},
      {name: 'Databases', class: 'tag-db'},
      {name: 'Frontend', class: 'tag-frontend'},
      {name: 'Backend', class: 'tag-backend'},
      {name: 'Full Stack', class: 'tag-fullstack'},
      {name: 'CI/CD', class: 'tag-cicd'}
    ];
    
    // Shuffle and pick 'count' tags
    return [...allTags]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  // This is kept for backward compatibility but should be removed if not used elsewhere
  getRandomSkillTag(): string {
    const tags = [
      'Algorithms', 'Data Structures', 'Design Patterns', 'Agile', 'CI/CD',
      'Automation', 'Containerization', 'Serverless', 'AI/ML', 'Blockchain'
    ];
    return tags[Math.floor(Math.random() * tags.length)];
  }

  // Get a random color class for skill tags
  getRandomTagClass(): string {
    const classes = ['tag-blue', 'tag-green', 'tag-yellow', 'tag-purple', 'tag-red'];
    return classes[Math.floor(Math.random() * classes.length)];
  }

  private simulateTerminal() {
    const messages = [
      '> Initializing skills assessment...',
      '> Scanning repositories...',
      '> Analyzing commit history...',
      '> Calculating proficiency levels...',
      '> Ready to display skills!'
    ];
    
    let currentLine = 0;
    const typeNextLine = () => {
      if (currentLine < messages.length) {
        this.terminalOutput += (currentLine > 0 ? '\n' : '') + messages[currentLine];
        currentLine++;
        setTimeout(typeNextLine, 300);
      } else {
        setTimeout(() => {
          this.showTerminalOutput = true;
        }, 500);
      }
    };
    
    typeNextLine();
  }
}
