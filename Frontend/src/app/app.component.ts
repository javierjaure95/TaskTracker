import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './services/dark-mode.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasktracker';

  darkMode = false;

  constructor(private darkModeService: DarkModeService) {
    this.darkModeService.darkMode$.subscribe(mode => {
      this.darkMode = mode;
      if (mode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}

