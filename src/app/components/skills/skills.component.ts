import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type SkillCategory = {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number;
    icon?: string;
  }[];
};

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
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
        { name: 'TypeScript', level: 90, icon: 'fa-brands fa-js' },
        { name: 'Python', level: 85, icon: 'fa-brands fa-python' },
        { name: 'Java', level: 80, icon: 'fa-brands fa-java' },
        { name: 'C#', level: 75, icon: 'fa-solid fa-c' },
        { name: 'SQL', level: 85, icon: 'fa-solid fa-database' },
      ]
    },
    {
      name: 'frontend',
      icon: 'fa-desktop',
      skills: [
        { name: 'Angular', level: 90, icon: 'fa-brands fa-angular' },
        { name: 'React', level: 80, icon: 'fa-brands fa-react' },
        { name: 'HTML5', level: 95, icon: 'fa-brands fa-html5' },
        { name: 'CSS3/SCSS', level: 90, icon: 'fa-brands fa-css3-alt' },
        { name: 'RxJS', level: 85, icon: 'fa-solid fa-bolt' },
      ]
    },
    {
      name: 'backend',
      icon: 'fa-server',
      skills: [
        { name: 'Node.js', level: 85, icon: 'fa-brands fa-node-js' },
        { name: 'Express', level: 80, icon: 'fa-solid fa-server' },
        { name: '.NET Core', level: 75, icon: 'fa-brands fa-windows' },
        { name: 'RESTful APIs', level: 90, icon: 'fa-solid fa-route' },
        { name: 'GraphQL', level: 70, icon: 'fa-solid fa-diagram-project' },
      ]
    },
    {
      name: 'tools',
      icon: 'fa-tools',
      skills: [
        { name: 'Git', level: 90, icon: 'fa-brands fa-git-alt' },
        { name: 'Docker', level: 75, icon: 'fa-brands fa-docker' },
        { name: 'Azure', level: 70, icon: 'fa-brands fa-microsoft' },
        { name: 'AWS', level: 65, icon: 'fa-brands fa-aws' },
        { name: 'CI/CD', level: 80, icon: 'fa-solid fa-arrows-rotate' },
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

  // Generate random skill tags for display
  getRandomSkillTag(): string {
    const tags = [
      'Web Development', 'Mobile', 'Cloud', 'DevOps', 'UI/UX', 'Testing',
      'Performance', 'Security', 'APIs', 'Microservices', 'Databases',
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
