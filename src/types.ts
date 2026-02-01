export type UserRole = 'Superadmin' | 'Bendahara' | 'KepalaSekolah' | 'WakilSarana' | 'Siswa';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  kelas?: string;
}

export interface Payment {
  id: string;
  bulan: string;
  tahun: number;
  jumlah: number;
  status: 'Lunas' | 'Belum Lunas';
  type: 'SPP' | 'DU' | 'Lainnya'; // Added to distinguish payment types
  tanggalBayar?: string;
  petugas?: string; // Who processed this
}

export interface Student extends User {
  role: 'Siswa';
  nisn: string;
  noWa: string;
  kelasX?: string;
  kelasXi?: string;
  kelasXii?: string;
  nominalSpp: number;
  nominalDuXi?: number;
  nominalDuXii?: number;
  statusSiswa: 'Aktif' | 'Lulus' | 'Keluar';
  tahunMasuk: number;
  paymentHistory: Payment[];
}

// New Interfaces for Feature Expansion
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  costEstimate: number;
  requestDate: string;
  status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
  priority: 'Rendah' | 'Sedang' | 'Tinggi';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  type: 'Info' | 'Warning' | 'Danger';
}

export interface DailyRecap {
  date: string;
  totalTransactions: number;
  totalAmount: number;
}
