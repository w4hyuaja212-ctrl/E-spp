import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  authService = inject(AuthService); // Public for template access
  private router = inject(Router);
  
  username = signal('');
  isLoading = signal(false);
  showWelcome = signal(false);
  loginError = signal<string | null>(null);
  
  // Time & Date Signals
  realtimeClock = signal('');
  currentDate = signal('');
  greeting = signal('');
  
  private clockInterval: any;

  ngOnInit(): void {
    // If user is already logged in (restored from localStorage), go to dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  updateClock(): void {
    const now = new Date();
    
    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.realtimeClock.set(`${hours}:${minutes}:${seconds}`);

    // Date (Indonesian Format)
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.currentDate.set(now.toLocaleDateString('id-ID', dateOptions));

    // Greeting
    const hourInt = now.getHours();
    if (hourInt < 11) this.greeting.set('Selamat Pagi');
    else if (hourInt < 15) this.greeting.set('Selamat Siang');
    else if (hourInt < 18) this.greeting.set('Selamat Sore');
    else this.greeting.set('Selamat Malam');
  }

  async handleLogin(): Promise<void> {
    if (!this.username() || this.isLoading()) return;

    this.isLoading.set(true);
    this.loginError.set(null);

    const success = await this.authService.login(this.username());
    
    this.isLoading.set(false);

    if (success) {
      // Show Welcome Animation
      this.showWelcome.set(true);
      
      // Navigate after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.loginError.set('Username / NIS tidak ditemukan.');
    }
  }
}