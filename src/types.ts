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
  tanggalBayar?: string;
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
