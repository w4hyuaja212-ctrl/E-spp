import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ExcelService } from '../../services/excel.service';
import { Student } from '../../types';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ConfirmationDialogComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthService);
  dataService = inject(DataService);
  excelService = inject(ExcelService);

  currentUser = this.authService.currentUser;
  
  // -- Data Source Signals --
  allStudents = signal<Student[]>([]);
  
  // -- Computed Data per Role --
  
  // Siswa
  studentData = computed(() => {
    const user = this.currentUser();
    if (user && user.role === 'Siswa') {
      return this.dataService.findUserById(user.id) as Student;
    }
    return null;
  });

  // Kepala Sekolah
  financialStats = computed(() => this.dataService.getFinancialStats());

  // Wakil Sarana
  maintenanceRequests = computed(() => this.dataService.getMaintenanceRequests());
  saranaBudget = signal(45000000);

  // Superadmin
  systemLogs = computed(() => this.dataService.getSystemLogs());

  // Bendahara
  recentTransactions = computed(() => this.dataService.getRecentTransactions());
  
  // -- Interaction Signals --
  showLogoutConfirmation = signal(false);
  
  // Bendahara State
  searchNis = signal('');
  foundStudent = signal<Student | null>(null);
  selectedMonth = signal('Maret');
  
  // Wakil Sarana State
  newRequest = signal({ title: '', cost: 0 });

  constructor() {
    const role = this.currentUser()?.role;
    // Load global student data for admin roles
    if(['Superadmin', 'Bendahara', 'KepalaSekolah'].includes(role || '')) {
      this.allStudents.set(this.dataService.getAllStudents());
    }
  }

  // -- Actions --

  searchStudent() {
    if (!this.searchNis()) return;
    const student = this.dataService.findUserById(this.searchNis());
    if (student && student.role === 'Siswa') {
        this.foundStudent.set(student as Student);
    } else {
        alert('Siswa tidak ditemukan!');
        this.foundStudent.set(null);
    }
  }

  processPayment() {
    if (!this.foundStudent()) return;
    alert(`Pembayaran SPP Bulan ${this.selectedMonth()} untuk ${this.foundStudent()?.name} Berhasil diproses!`);
    this.foundStudent.set(null);
    this.searchNis.set('');
  }

  submitMaintenanceRequest() {
    if (!this.newRequest().title) return;
    alert('Pengajuan perbaikan berhasil dikirim ke Kepala Sekolah untuk disetujui.');
    this.newRequest.set({ title: '', cost: 0 });
  }

  // SUPERADMIN ACTIONS
  
  exportDataExcel() {
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `E-SPP_Backup_Data_${dateStr}`;
    
    // Call the service to generate real .xlsx
    this.excelService.exportToExcel(
      this.allStudents(),
      this.dataService.getSystemLogs(),
      fileName
    );
    
    alert('Data berhasil diexport ke format Excel (.xlsx)!');
  }

  triggerImport() {
    // Simulation of file input click
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, we would use FileReader and SheetJS here to parse
            alert(`Membaca file: ${file.name}\nSimulasi: Data berhasil di-import ke database!`);
        }
    };
    input.click();
  }

  // GENERAL ACTIONS

  printReport() {
    window.print();
  }

  downloadReceipt(paymentId: string) {
    alert(`Mengunduh Kuitansi #${paymentId}...`);
  }

  // -- Auth --
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