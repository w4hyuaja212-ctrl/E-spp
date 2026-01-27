import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Student } from '../../types';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ConfirmationDialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthService);
  dataService = inject(DataService);

  currentUser = this.authService.currentUser;
  
  // Data for Siswa View
  studentData = computed(() => {
    const user = this.currentUser();
    if (user && user.role === 'Siswa') {
      return this.dataService.findUserById(user.id) as Student;
    }
    return null;
  });

  // Data for Bendahara, Superadmin, Kepala Sekolah
  allStudents = signal<Student[]>([]);
  
  // Data for Kepala Sekolah
  financialStats = computed(() => {
    return this.dataService.getFinancialStats();
  });

  showLogoutConfirmation = signal(false);
  
  constructor() {
    const role = this.currentUser()?.role;
    // Roles that need access to all student data
    if(role === 'Superadmin' || role === 'Bendahara' || role === 'KepalaSekolah') {
      this.allStudents.set(this.dataService.getAllStudents());
    }
  }

  requestLogout(): void {
    this.showLogoutConfirmation.set(true);
  }

  confirmLogout(): void {
    this.authService.logout();
    this.showLogoutConfirmation.set(false);
  }

  cancelLogout(): void {
    this.showLogoutConfirmation.set(false);
  }
}
