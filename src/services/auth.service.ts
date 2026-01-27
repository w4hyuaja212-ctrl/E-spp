import { Injectable, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../types';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataService = inject(DataService);
  private router = inject(Router);

  // Initialize currentUser by checking localStorage for a persisted session ID
  readonly currentUser = signal<User | null>(this.restoreSession());
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  private restoreSession(): User | null {
    try {
      const storedId = localStorage.getItem('e_spp_user_id');
      if (storedId) {
        // Verify the user still exists in our data
        return this.dataService.findUserById(storedId) || null;
      }
    } catch (error) {
      console.error('Failed to restore session:', error);
    }
    return null;
  }

  async login(id: string): Promise<boolean> {
    const user = this.dataService.findUserById(id);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    if (user) {
      this.currentUser.set(user);
      // Persist the user ID
      localStorage.setItem('e_spp_user_id', user.id);
      return true;
    } else {
      this.currentUser.set(null);
      return false;
    }
  }

  logout(): void {
    this.currentUser.set(null);
    // Clear persisted session
    localStorage.removeItem('e_spp_user_id');
    this.router.navigate(['/login']);
  }
}
