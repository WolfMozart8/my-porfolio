import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Load saved language preference or use browser language
    const savedLang = localStorage.getItem('userLanguage') as Language || 
                     (navigator.language.startsWith('es') ? 'es' : 'en');
    this.setLanguage(savedLang);
  }

  setLanguage(lang: Language): void {
    this.currentLanguageSubject.next(lang);
    localStorage.setItem('userLanguage', lang);
    document.documentElement.lang = lang; // Update HTML lang attribute
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }
}
