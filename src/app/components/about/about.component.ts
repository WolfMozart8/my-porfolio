import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LanguageService } from '../../services/language.service';

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
  imports: [CommonModule, TerminalComponent, HttpClientModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  aboutTexts = {
    en: `Hello! I'm [Your Name], a passionate developer with a love for creating beautiful and functional applications. With several years of experience in the tech industry, I specialize in building modern web applications using cutting-edge technologies.`,
    es: `¡Hola! Soy [Tu Nombre], un desarrollador apasionado por crear aplicaciones hermosas y funcionales. Con varios años de experiencia en la industria tecnológica, me especializo en construir aplicaciones web modernas utilizando tecnologías de vanguardia.`
  };
  
  aboutText = this.aboutTexts['en'];
  experiences: Experience[] = [];
  education: Education[] = [];
  showContent = false;
  isLoading = true;
  private dataSubscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Set initial language
    this.setLanguage(this.languageService.getCurrentLanguage());
    
    // Subscribe to language changes
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.setLanguage(lang);
      });
    
    // Load data
    this.loadExperienceData();
    this.loadEducationData();
    
    // Trigger animation after a short delay
    setTimeout(() => {
      this.showContent = true;
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.dataSubscription.unsubscribe();
  }
  
  private setLanguage(lang: 'en' | 'es'): void {
    this.aboutText = this.aboutTexts[lang];
    // Data will be reloaded when the language changes due to the subscription
  }

  private loadExperienceData(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.dataSubscription.add(
      this.http.get<{ experiences: { [key: string]: Experience[] } }>('assets/data/experience.json').subscribe({
        next: (data) => {
          this.experiences = data.experiences[currentLang] || data.experiences['en'] || [];
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading experience data:', error);
          this.checkLoadingComplete();
        }
      })
    );
    
    // Update when language changes
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.http.get<{ experiences: { [key: string]: Experience[] } }>('assets/data/experience.json').subscribe({
          next: (data) => {
            this.experiences = data.experiences[lang] || data.experiences['en'] || [];
          },
          error: (error) => {
            console.error('Error loading experience data:', error);
          }
        });
      });
  }

  private loadEducationData(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.dataSubscription.add(
      this.http.get<{ education: { [key: string]: Education[] } }>('assets/data/education.json').subscribe({
        next: (data) => {
          this.education = data.education[currentLang] || data.education['en'] || [];
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading education data:', error);
          this.checkLoadingComplete();
        }
      })
    );
    
    // Update when language changes
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.http.get<{ education: { [key: string]: Education[] } }>('assets/data/education.json').subscribe({
          next: (data) => {
            this.education = data.education[lang] || data.education['en'] || [];
          },
          error: (error) => {
            console.error('Error loading education data:', error);
          }
        });
      });
  }

  private checkLoadingComplete(): void {
    // This will be called after each data load attempt
    // You can add more sophisticated loading state handling if needed
    if (this.experiences.length > 0 || this.education.length > 0) {
      this.isLoading = false;
    }
  }
}
