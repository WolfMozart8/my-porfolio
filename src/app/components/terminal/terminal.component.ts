import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {
  @Input() terminalTitle: string = 'Terminal';
}
