import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LanguageService, Language } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnDestroy {
  private translations: { [key in Language]?: any } = {};
  private translationsLoaded = new BehaviorSubject<boolean>(false);
  private languageSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    // Load initial translations
    this.loadTranslations(this.languageService.getCurrentLanguage());
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.loadTranslations(lang);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  getTranslation(key: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    
    // If translations aren't loaded yet, return the key
    if (!this.translations[currentLang]) {
      console.warn(`Translations not loaded for language: ${currentLang}`);
      return key;
    }
    
    const keys = key.split('.');
    let value = this.translations[currentLang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation not found for key: ${key} in language ${currentLang}`);
        return key; // Return the key if translation not found
      }
    }
    return value || key;
  }

  getTranslationArray(key: string): string[] {
    const currentLang = this.languageService.getCurrentLanguage();
    if (!this.translations[currentLang]) {
      console.warn(`No translations loaded for language: ${currentLang}`);
      return [key];
    }
    
    const keys = key.split('.');
    let value = this.translations[currentLang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation array not found for key: ${key} in language ${currentLang}`);
        return [key];
      }
    }
    
    if (!Array.isArray(value)) {
      console.warn(`Translation for key ${key} is not an array in language ${currentLang}`);
      return value !== undefined ? [value] : [key];
    }
    
    return value;
  }

  private loadTranslations(lang: Language): void {
    // Mark translations as not loaded
    this.translationsLoaded.next(false);
    
    // If we already have translations for this language, just update the loaded flag
    if (this.translations[lang]) {
      this.translationsLoaded.next(true);
      return;
    }
    
    this.http.get(`/assets/i18n/${lang}.json`).pipe(
      tap(data => {
        this.translations[lang] = data;
        this.translationsLoaded.next(true);
        console.log(`Loaded translations for ${lang}`);
      }),
      catchError(error => {
        console.error(`Error loading ${lang} translations:`, error);
        // Initialize with empty object to prevent repeated failed requests
        this.translations[lang] = {};
        this.translationsLoaded.next(true);
        return of(null);
      })
    ).subscribe();
  }
  
  // Helper method to wait for translations to be loaded
  waitForTranslations(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.translationsLoaded.value) {
        resolve(true);
      } else {
        const sub = this.translationsLoaded.subscribe(loaded => {
          if (loaded) {
            sub.unsubscribe();
            resolve(true);
          }
        });
      }
    });
  }
}
