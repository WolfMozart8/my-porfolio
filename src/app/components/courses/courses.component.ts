import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Subscription } from 'rxjs';

interface CourseContent {
  title: string;
  description: string;
}

type CourseType = 'certification' | 'course';

interface Course {
  id: string;
  en: CourseContent;
  es: CourseContent;
  platform: string;
  year: number;
  certificateUrl: string;
  professional: boolean;
  type: CourseType;
}

interface CourseDisplay extends Omit<Course, 'en' | 'es'> {
  title: string;
  description: string;
}

interface CoursesData {
  courses: Course[];
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, TerminalComponent, TranslatePipe],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  displayedCourses: CourseDisplay[] = [];
  private languageSubscription: Subscription;
  currentLanguage: string = 'en';

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      if (this.courses.length > 0) {
        this.updateDisplayedCourses();
      }
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadCourses(): void {
    this.http.get<CoursesData>('assets/data/courses.json').subscribe({
      next: (data) => {
        this.courses = data.courses.sort((a, b) => b.year - a.year);
        this.updateDisplayedCourses();
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  private updateDisplayedCourses(): void {
    this.displayedCourses = this.courses.map(course => {
      const content = course[this.currentLanguage as 'en' | 'es'] || course.en;
      return {
        ...course,
        title: content.title,
        description: content.description
      };
    });
  }

  getPlatformIcon(platform: string): string {
    const platformIcons: { [key: string]: string } = {
      'udemy': 'fab fa-udemy',
      'coursera': 'fab fa-coursera',
      'edx': 'fas fa-university',
      'amazon web services': 'fab fa-aws',
      'google': 'fab fa-google',
      'microsoft': 'fab fa-microsoft',
      'linkedin': 'fab fa-linkedin',
      'freecodecamp': 'fas fa-free-code-camp',
      'pluralsight': 'fas fa-tv',
      'udacity': 'fas fa-graduation-cap',
      'red hat': 'fab fa-linux',  // Using Linux icon as fallback for Red Hat
      'redhat': 'fab fa-linux'    // Handle both 'Red Hat' and 'RedHat' variations
    };

    const lowerPlatform = platform.toLowerCase();
    return platformIcons[lowerPlatform] || 'fas fa-certificate';
  }
}
