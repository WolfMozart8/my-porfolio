import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'fab fa-github',
      username: 'yourusername'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'fab fa-linkedin',
      username: 'yourusername'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'fab fa-twitter',
      username: '@yourusername'
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: 'fas fa-envelope',
      username: 'your.email@example.com'
    }
  ];

  isSubmitted = false;
  isSending = false;

  onSubmit() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      this.isSending = true;
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm);
        this.isSending = false;
        this.isSubmitted = true;
        
        // Reset form after submission
        setTimeout(() => {
          this.contactForm = { name: '', email: '', message: '' };
          this.isSubmitted = false;
        }, 3000);
      }, 1500);
    }
  }
}
