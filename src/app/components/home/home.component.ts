import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../terminal/terminal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  terminalLines: string[] = [
    'Hello, I\'m [Your Name]',
    'Full Stack Developer & Tech Enthusiast'
  ];
  currentLine = 0;
  displayText = '';
  isTyping = true;

  ngOnInit() {
    this.typeNextLine();
  }

  private typeNextLine() {
    if (this.currentLine < this.terminalLines.length) {
      const line = this.terminalLines[this.currentLine];
      this.typeText(line, 0);
    }
  }

  private typeText(text: string, index: number) {
    if (index < text.length) {
      this.displayText += text.charAt(index);
      setTimeout(() => this.typeText(text, index + 1), 20);
    } else {
      this.currentLine++;
      this.displayText += '\n';
      
      if (this.currentLine < this.terminalLines.length) {
        setTimeout(() => this.typeNextLine(), 500);
      } else {
        this.isTyping = false;
      }
    }
  }
}
