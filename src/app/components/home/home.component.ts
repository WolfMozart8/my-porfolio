import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TerminalFormatterPipe } from '../../pipes/terminal-formatter.pipe';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    TerminalComponent, 
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Text content that can be updated based on language
  yourName = '[Your Name]';
  yourLocation = '[Your Location]';
  
  // Terminal animation properties
  terminalLines: string[] = [];
  currentLine = 0;
  displayText = '';
  isTyping = true;
  private languageSubscription: Subscription | undefined;
  private typingSpeed = 50; // ms per character
  private newLineDelay = 500; // ms before starting next line

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.updateTerminalLines();
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.updateTerminalLines();
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private updateTerminalLines() {
    const currentLang = this.languageService.getCurrentLanguage();
    
    if (currentLang === 'es') {
      this.terminalLines = [
        '¡Hola, soy [Tu Nombre]',
        'Desarrollador Full Stack y Entusiasta de la Tecnología'
      ];
    } else {
      this.terminalLines = [
        'Hello, I\'m [Your Name]',
        'Full Stack Developer & Tech Enthusiast'
      ];
    }
    
    // Reset animation
    this.currentLine = 0;
    this.displayText = '';
    this.typeNextLine();
  }

  private typeNextLine() {
    if (this.currentLine < this.terminalLines.length) {
      const line = this.terminalLines[this.currentLine];
      this.typeText(line, 0);
    } else {
      this.isTyping = false;
    }
  }

  private typeText(text: string, index: number) {
    if (index < text.length) {
      this.displayText += text.charAt(index);
      setTimeout(() => this.typeText(text, index + 1), this.typingSpeed);
    } else {
      this.currentLine++;
      if (this.currentLine < this.terminalLines.length) {
        this.displayText += '\n';
        setTimeout(() => this.typeNextLine(), this.newLineDelay);
      } else {
        this.isTyping = false;
      }
    }
  }
}
