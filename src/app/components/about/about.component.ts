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
    en: `I’m Felipe Ríos, a Full Stack Developer with solid experience in building modern, well-structured web applications. I’m passionate about turning ideas into functional digital solutions, paying attention to both the internal architecture and the user experience.
I see myself as a curious and constantly learning person, always seeking new ways to optimize processes and solve problems creatively. I’ve worked on projects ranging from business logic to dynamic interfaces, adapting to different environments and needs.
Outside of coding, I enjoy learning new languages and exploring technology from different perspectives, always aiming to grow both personally and professionally.`,
    es: `Soy Felipe Ríos, desarrollador Full Stack con una sólida experiencia en la creación de aplicaciones web modernas y bien estructuradas. Me apasiona transformar ideas en soluciones digitales funcionales, cuidando tanto la arquitectura interna como la experiencia del usuario.
Me considero una persona curiosa y en constante aprendizaje, siempre buscando nuevas formas de optimizar procesos y resolver problemas de manera creativa. He trabajado en proyectos que abarcan desde la lógica de negocio hasta interfaces dinámicas, adaptándome a diferentes entornos y necesidades.
Fuera del código, disfruto aprender nuevos idiomas y explorar la tecnología desde distintas perspectivas, siempre con el objetivo de seguir creciendo personal y profesionalmente..`};
  
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
