import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string[];
};

type Education = {
  degree: string;
  institution: string;
  period: string;
  details: string;
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutText = `Hello! I'm [Your Name], a passionate developer with a love for creating beautiful and functional applications. With several years of experience in the tech industry, I specialize in building modern web applications using cutting-edge technologies.`;
  
  experiences: Experience[] = [
    {
      title: 'Senior Developer',
      company: 'Tech Solutions Inc.',
      period: '2020 - Present',
      description: [
        'Developed and maintained multiple web applications using Angular and Node.js',
        'Led a team of 5 developers in implementing new features and improving performance',
        'Reduced application load time by 40% through code optimization'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Creations',
      period: '2018 - 2020',
      description: [
        'Built responsive user interfaces using React and TypeScript',
        'Collaborated with designers to implement pixel-perfect UIs',
        'Improved application accessibility to meet WCAG 2.1 standards'
      ]
    }
  ];

  education: Education[] = [
    {
      degree: 'Master of Computer Science',
      institution: 'Tech University',
      period: '2016 - 2018',
      details: 'Specialized in Artificial Intelligence and Machine Learning'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      period: '2012 - 2016',
      details: 'Graduated with Honors'
    }
  ];

  // Animation state
  showContent = false;

  ngOnInit() {
    // Trigger animation after a short delay
    setTimeout(() => {
      this.showContent = true;
    }, 100);
  }
}
