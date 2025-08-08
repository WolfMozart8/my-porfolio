import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  roles: string[] = [
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'Creative Thinker',
    'Team Player'
  ];
  currentRole: string = '';
  currentIndex: number = 0;
  isTyping: boolean = true;
  private typingSpeed: number = 100; // ms per character
  private erasingSpeed: number = 50; // ms per character when erasing
  private newTextDelay: number = 2000; // delay before starting to type next role
  private timeoutId: any;
  constructor() {}

  ngOnInit(): void {
    this.typeWriter();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private typeWriter(): void {
    const currentRole = this.roles[this.currentIndex];
    
    if (this.isTyping) {
      // Typing logic
      if (this.currentRole.length < currentRole.length) {
        this.currentRole = currentRole.substring(0, this.currentRole.length + 1);
        this.timeoutId = setTimeout(() => this.typeWriter(), this.typingSpeed);
      } else {
        this.isTyping = false;
        this.timeoutId = setTimeout(() => this.typeWriter(), this.newTextDelay);
      }
    } else {
      // Erasing logic
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.substring(0, this.currentRole.length - 1);
        this.timeoutId = setTimeout(() => this.typeWriter(), this.erasingSpeed);
      } else {
        this.isTyping = true;
        this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        this.timeoutId = setTimeout(() => this.typeWriter(), this.typingSpeed);
      }
    }
  }
}
