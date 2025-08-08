import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'terminalFormatter',
  standalone: true
})
export class TerminalFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Replace newlines with <br> for HTML display
    // And escape HTML to prevent XSS
    return this.escapeHtml(value).replace(/\n/g, '<br>');
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
