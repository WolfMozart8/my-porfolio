import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private translations: { [lang: string]: { [key: string]: string } } = {
    en: {
      'GREETING': 'Hello, I\'m',
      'TAGLINE': 'Full Stack Developer & Problem Solver',
      'WELCOME': 'Welcome to my digital portfolio! I build exceptional digital experiences with modern web technologies.',
      'ABOUT_ME': 'About Me',
      'PROJECTS': 'Projects',
      'SKILLS': 'Skills',
      'CONTACT': 'Contact',
      'CURRENTLY': 'Currently: {{status}}',
      'OPEN_TO_OPPORTUNITIES': 'Open to Opportunities',
      'LOCATION': 'Based in: {{location}}',
      'EMAIL_ME': 'Email Me',
      'GITHUB': 'GitHub',
      'LINKEDIN': 'LinkedIn',
      'CONTACT_ME': 'Let\'s get in touch! I\'m always open to discussing new projects, creative ideas, or opportunities.'
    },
    es: {
      'GREETING': '¡Hola, soy',
      'TAGLINE': 'Desarrollador Full Stack y Resolvedor de Problemas',
      'WELCOME': '¡Bienvenido a mi portafolio digital! Construyo experiencias digitales excepcionales con tecnologías web modernas.',
      'ABOUT_ME': 'Sobre Mí',
      'PROJECTS': 'Proyectos',
      'SKILLS': 'Habilidades',
      'CONTACT': 'Contacto',
      'CURRENTLY': 'Actualmente: {{status}}',
      'OPEN_TO_OPPORTUNITIES': 'Abierto a Oportunidades',
      'LOCATION': 'Ubicado en: {{location}}',
      'EMAIL_ME': 'Enviar Correo',
      'GITHUB': 'GitHub',
      'LINKEDIN': 'LinkedIn',
      'CONTACT_ME': '¡Hablemos! Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades.'
    }
  };

  constructor(private languageService: LanguageService) {}

  transform(key: string, params?: Record<string, string>): string {
    const currentLang = this.languageService.getCurrentLanguage();
    let translation = this.translations[currentLang]?.[key] || key;

    // Replace parameters in the translation
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }

    return translation;
  }
}
