import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';

type SkillTag = {
  name: string;
  class: string;
};

type Skill = {
  name: string;
  level: number;
  icon?: string;
  tags: SkillTag[];
};

type SkillCategory = {
  name: string;
  icon: string;
  skills: Skill[];
};

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  activeCategory: string = 'languages';
  showTerminalOutput = false;
  terminalOutput = '';
  
  skillCategories: SkillCategory[] = [
    {
      name: 'languages',
      icon: 'fa-code',
      skills: [
        { 
          name: 'TypeScript', 
          level: 90, 
          icon: 'fa-brands fa-js', 
          tags: [
            { name: 'Frontend', class: 'tag-frontend' },
            { name: 'Web Dev', class: 'tag-web' },
            { name: 'Full Stack', class: 'tag-fullstack' }
          ]
        },
        { 
          name: 'Python', 
          level: 85, 
          icon: 'fa-brands fa-python',
          tags: [
            { name: 'Backend', class: 'tag-backend' },
            { name: 'Automation', class: 'tag-auto' },
            { name: 'AI/ML', class: 'tag-ai' }
          ]
        },
        { 
          name: 'Java', 
          level: 80, 
          icon: 'fa-brands fa-java',
          tags: [
            { name: 'Backend', class: 'tag-backend' },
            { name: 'Enterprise', class: 'tag-enterprise' },
            { name: 'Microservices', class: 'tag-micro' }
          ]
        },
        { 
          name: 'C#', 
          level: 75, 
          icon: 'fa-solid fa-c',
          tags: [
            { name: 'Backend', class: 'tag-backend' },
            { name: 'Desktop', class: 'tag-desktop' },
            { name: 'Game Dev', class: 'tag-game' }
          ]
        },
        { 
          name: 'SQL', 
          level: 85, 
          icon: 'fa-solid fa-database',
          tags: [
            { name: 'Databases', class: 'tag-db' },
            { name: 'Backend', class: 'tag-backend' },
            { name: 'Data', class: 'tag-data' }
          ]
        },
      ]
    },
    {
      name: 'frontend',
      icon: 'fa-desktop',
      skills: [
        { 
          name: 'Angular', 
          level: 90, 
          icon: 'fa-brands fa-angular',
          tags: [
            { name: 'Frontend', class: 'tag-frontend' },
            { name: 'SPA', class: 'tag-spa' },
            { name: 'TypeScript', class: 'tag-ts' }
          ]
        },
        { 
          name: 'React', 
          level: 80, 
          icon: 'fa-brands fa-react',
          tags: [
            { name: 'Frontend', class: 'tag-frontend' },
            { name: 'UI', class: 'tag-ui' },
            { name: 'Component', class: 'tag-comp' }
          ]
        },
        { 
          name: 'HTML5', 
          level: 95, 
          icon: 'fa-brands fa-html5',
          tags: [
            { name: 'Web', class: 'tag-web' },
            { name: 'Markup', class: 'tag-markup' },
            { name: 'Frontend', class: 'tag-frontend' }
          ]
        },
        { 
          name: 'CSS3/SCSS', 
          level: 90, 
          icon: 'fa-brands fa-css3-alt',
          tags: [
            { name: 'Styling', class: 'tag-style' },
            { name: 'Responsive', class: 'tag-resp' },
            { name: 'Design', class: 'tag-design' }
          ]
        },
        { 
          name: 'RxJS', 
          level: 85, 
          icon: 'fa-solid fa-bolt',
          tags: [
            { name: 'Reactive', class: 'tag-reactive' },
            { name: 'Async', class: 'tag-async' },
            { name: 'Streams', class: 'tag-streams' }
          ]
        },
      ]
    },
    {
      name: 'backend',
      icon: 'fa-server',
      skills: [
        { 
          name: 'Node.js', 
          level: 85, 
          icon: 'fa-brands fa-node-js',
          tags: [
            { name: 'Backend', class: 'tag-backend' },
            { name: 'JavaScript', class: 'tag-js' },
            { name: 'API', class: 'tag-api' }
          ]
        },
        { 
          name: 'Express', 
          level: 80, 
          icon: 'fa-solid fa-server',
          tags: [
            { name: 'Backend', class: 'tag-backend' },
            { name: 'REST', class: 'tag-rest' },
            { name: 'API', class: 'tag-api' }
          ]
        },
        { 
          name: '.NET Core', 
          level: 75, 
          icon: 'fa-brands fa-windows',
          tags: [
            { name: 'Backend', class: 'tag-backend' },
            { name: 'C#', class: 'tag-csharp' },
            { name: 'Microservices', class: 'tag-micro' }
          ]
        },
        { 
          name: 'RESTful APIs', 
          level: 90, 
          icon: 'fa-solid fa-route',
          tags: [
            { name: 'API', class: 'tag-api' },
            { name: 'Backend', class: 'tag-backend' },
            { name: 'Integration', class: 'tag-integration' }
          ]
        },
        { 
          name: 'GraphQL', 
          level: 70, 
          icon: 'fa-solid fa-diagram-project',
          tags: [
            { name: 'API', class: 'tag-api' },
            { name: 'Query', class: 'tag-query' },
            { name: 'Flexible', class: 'tag-flex' }
          ]
        },
      ]
    },
    {
      name: 'tools',
      icon: 'fa-tools',
      skills: [
        { 
          name: 'Git', 
          level: 90, 
          icon: 'fa-brands fa-git-alt',
          tags: [
            { name: 'Version Control', class: 'tag-vcs' },
            { name: 'Collaboration', class: 'tag-collab' },
            { name: 'DevOps', class: 'tag-devops' }
          ]
        },
        { 
          name: 'Docker', 
          level: 75, 
          icon: 'fa-brands fa-docker',
          tags: [
            { name: 'Containers', class: 'tag-containers' },
            { name: 'DevOps', class: 'tag-devops' },
            { name: 'Deployment', class: 'tag-deploy' }
          ]
        },
        { 
          name: 'Azure', 
          level: 70, 
          icon: 'fa-brands fa-microsoft',
          tags: [
            { name: 'Cloud', class: 'tag-cloud' },
            { name: 'Hosting', class: 'tag-host' },
            { name: 'Services', class: 'tag-services' }
          ]
        },
        { 
          name: 'AWS', 
          level: 65, 
          icon: 'fa-brands fa-aws',
          tags: [
            { name: 'Cloud', class: 'tag-cloud' },
            { name: 'Hosting', class: 'tag-host' },
            { name: 'Services', class: 'tag-services' }
          ]
        },
        { 
          name: 'CI/CD', 
          level: 80, 
          icon: 'fa-solid fa-arrows-rotate',
          tags: [
            { name: 'DevOps', class: 'tag-devops' },
            { name: 'Automation', class: 'tag-auto' },
            { name: 'Deployment', class: 'tag-deploy' }
          ]
        },
      ]
    }
  ];

  ngOnInit() {
    // Simulate terminal typing effect on component load
    this.simulateTerminal();
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
    this.showTerminalOutput = false;
    // Optional: Add sound effect here for better UX
  }

  getActiveSkills() {
    return this.skillCategories.find(cat => cat.name === this.activeCategory)?.skills || [];
  }

  getSkillLevelClass(level: number): string {
    if (level >= 85) return 'expert';
    if (level >= 70) return 'advanced';
    if (level >= 55) return 'intermediate';
    return 'beginner';
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
