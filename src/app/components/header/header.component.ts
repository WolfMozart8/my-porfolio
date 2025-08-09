import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Public properties for template
  roles: string[] = [];
  currentRole: string = '';
  currentIndex: number = 0;
  isTyping: boolean = true;
  
  // Services
  private translationService = inject(TranslationService);
  private languageService = inject(LanguageService);
  
  // Private properties
  private typingSpeed = 100; // ms per character
  private erasingSpeed = 50; // ms per character when erasing
  private newTextDelay = 2000; // delay before starting to type next role
  private timeoutId: any = null;
  private languageSubscription: Subscription | null = null;
  private isInitialized = false;

  constructor() {}

  async ngOnInit(): Promise<void> {
    try {
      // Initial load
      await this.loadRoles();
      
      // Subscribe to language changes
      this.languageSubscription = this.languageService.currentLanguage$.subscribe({
        next: async () => {
          if (this.isInitialized) {
            await this.loadRoles();
            this.resetTyping();
          } else {
            this.isInitialized = true;
          }
        },
        error: (err) => console.error('Error in language subscription:', err)
      });
    } catch (error) {
      console.error('Error initializing header component:', error);
      // Fallback to default roles
      this.roles = ['Software Developer'];
      this.resetTyping();
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
      this.languageSubscription = null;
    }
  }

  private async loadRoles(): Promise<void> {
    try {
      // Wait for translations to be loaded
      await this.translationService.waitForTranslations();
      
      // Now get the roles
      const roles = this.translationService.getTranslationArray('header.roles');
      this.roles = roles.length > 0 ? roles : ['Software Developer'];
      
      // Reset typing if we have new roles
      if (this.roles.length > 0) {
        this.resetTyping();
      }
    } catch (error) {
      console.error('Error loading roles:', error);
      this.roles = ['Software Developer'];
    }
  }

  private resetTyping(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.currentRole = '';
    this.currentIndex = 0;
    this.isTyping = true;
    this.typeWriter();
  }

  private typeWriter(): void {
    if (this.roles.length === 0) return;

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
        this.timeoutId = setTimeout(() => this.typeWriter(), 500);
      }
    }
  }
}
