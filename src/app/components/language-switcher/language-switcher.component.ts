import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  @Input() isMobile: boolean = false;
  
  currentLanguage: 'en' | 'es' = 'en';
  languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Set initial language
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  switchLanguage(lang: string): void {
    if (lang === 'en' || lang === 'es') {
      this.languageService.setLanguage(lang);
      this.currentLanguage = lang;
    }
  }
}
