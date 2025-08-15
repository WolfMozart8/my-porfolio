import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalComponent } from '../terminal/terminal.component';
import { LanguageService } from '../../services/language.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TerminalComponent, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  emailContactForm: boolean = false;
  
  translations: any = {};
  private langChangeSubscription: Subscription;
  currentLanguage: string = 'en';
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/WolfMozart8',
      icon: 'fab fa-github',
      username: 'WolfMozart8'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/felipe-rios-77a169249/',
      icon: 'fab fa-linkedin',
      username: 'Felipe Ríos'
    },
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/yourusername',
    //   icon: 'fab fa-twitter',
    //   username: '@yourusername'
    // },
    {
      name: 'Email',
      url: 'mailto:feliperiosorellana@gmail.com',
      icon: 'fas fa-envelope',
      username: 'Email'
    }
  ];

  isSending = false;
  isSubmitted = false;

  constructor(
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.langChangeSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.loadTranslations();
    });
  }

  ngOnInit() {
    this.loadTranslations();
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private loadTranslations() {
    const lang = this.languageService.getCurrentLanguage();
    this.http.get(`/assets/i18n/${lang}.json`).subscribe({
      next: (data: any) => {
        this.translations = data.contact || {};
      },
      error: (error) => {
        console.error('Failed to load translations:', error);
        // Fallback to English if translation fails
        if (lang !== 'en') {
          this.http.get('/assets/i18n/en.json').subscribe({
            next: (enData: any) => {
              this.translations = enData.contact || {};
            }
          });
        }
      }
    });
  }

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
