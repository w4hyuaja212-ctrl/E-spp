import { Injectable } from '@angular/core';
import { MaintenanceRequest, Student, SystemLog, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly users: (User | Student)[] = [
    { id: 'superadmin', name: 'Master Administrator', role: 'Superadmin' },
    { id: 'bendahara', name: 'Siti Aminah, S.E.', role: 'Bendahara' },
    { id: 'kepsek', name: 'Dr. H. Ahmad Dahlan', role: 'KepalaSekolah' },
    { id: 'sarana', name: 'Ir. Budi Santoso', role: 'WakilSarana' },
    {
      id: '10123',
      name: 'Andi Pratama',
      role: 'Siswa',
      kelas: 'XII IPA 1',
      nisn: '0061234567',
      noWa: '081234567890',
      kelasX: 'X IPA 1',
      kelasXi: 'XI IPA 1',
      kelasXii: 'XII IPA 1',
      nominalSpp: 300000,
      nominalDuXi: 1500000,
      nominalDuXii: 1500000,
      statusSiswa: 'Aktif',
      tahunMasuk: 2022,
      paymentHistory: [
        // Daftar Ulang Payment Example
        { id: 'du1', bulan: 'Juli', tahun: 2023, jumlah: 1500000, status: 'Lunas', type: 'DU', tanggalBayar: '2023-07-05', petugas: 'Siti Aminah' },
        // SPP Payments
        { id: 'p1', bulan: 'Juli', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-07-10', petugas: 'Siti Aminah' },
        { id: 'p2', bulan: 'Agustus', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-08-12', petugas: 'Siti Aminah' },
        { id: 'p3', bulan: 'September', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-09-15', petugas: 'Siti Aminah' },
        { id: 'p4', bulan: 'Oktober', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-10-10', petugas: 'Siti Aminah' },
        { id: 'p5', bulan: 'November', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-11-05', petugas: 'Siti Aminah' },
        { id: 'p6', bulan: 'Desember', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-12-08', petugas: 'Siti Aminah' },
        { id: 'p7', bulan: 'Januari', tahun: 2024, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2024-01-10', petugas: 'Siti Aminah' },
        { id: 'p8', bulan: 'Februari', tahun: 2024, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2024-02-12', petugas: 'Siti Aminah' },
        { id: 'p9', bulan: 'Maret', tahun: 2024, jumlah: 300000, status: 'Belum Lunas', type: 'SPP' },
        { id: 'p10', bulan: 'April', tahun: 2024, jumlah: 300000, status: 'Belum Lunas', type: 'SPP' },
        { id: 'p11', bulan: 'Mei', tahun: 2024, jumlah: 300000, status: 'Belum Lunas', type: 'SPP' },
        { id: 'p12', bulan: 'Juni', tahun: 2024, jumlah: 300000, status: 'Belum Lunas', type: 'SPP' },
      ],
    },
    {
      id: '10124',
      name: 'Citra Lestari',
      role: 'Siswa',
      kelas: 'XII IPA 2',
      nisn: '0069876543',
      noWa: '081345678901',
      kelasX: 'X IPA 2',
      kelasXi: 'XI IPA 2',
      kelasXii: 'XII IPA 2',
      nominalSpp: 300000,
      nominalDuXi: 1500000,
      nominalDuXii: 1500000,
      statusSiswa: 'Aktif',
      tahunMasuk: 2022,
      paymentHistory: [
         { id: 'du2', bulan: 'Juli', tahun: 2023, jumlah: 1500000, status: 'Lunas', type: 'DU', tanggalBayar: '2023-07-08', petugas: 'Siti Aminah' },
        { id: 'p13', bulan: 'Juli', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-07-11', petugas: 'Siti Aminah' },
        { id: 'p14', bulan: 'Agustus', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-08-10', petugas: 'Siti Aminah' },
        { id: 'p15', bulan: 'September', tahun: 2023, jumlah: 300000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-09-09', petugas: 'Siti Aminah' },
        { id: 'p16', bulan: 'Oktober', tahun: 2023, jumlah: 300000, status: 'Belum Lunas', type: 'SPP' },
      ],
    },
    {
      id: '10125',
      name: 'Dimas Anggara',
      role: 'Siswa',
      kelas: 'XI IPS 1',
      nisn: '0071231231',
      noWa: '081998877665',
      kelasX: 'X IPS 1',
      kelasXi: 'XI IPS 1',
      nominalSpp: 250000,
      nominalDuXi: 1200000,
      statusSiswa: 'Aktif',
      tahunMasuk: 2023,
      paymentHistory: [
        { id: 'p17', bulan: 'Juli', tahun: 2023, jumlah: 250000, status: 'Lunas', type: 'SPP', tanggalBayar: '2023-07-15', petugas: 'Siti Aminah' },
        { id: 'p18', bulan: 'Agustus', tahun: 2023, jumlah: 250000, status: 'Belum Lunas', type: 'SPP' },
      ],
    },
  ];

  private readonly maintenanceRequests: MaintenanceRequest[] = [
    { id: 'mr1', title: 'Perbaikan AC Lab Komputer', description: 'AC bocor dan tidak dingin di Lab 2', costEstimate: 750000, requestDate: '2024-03-20', status: 'Diproses', priority: 'Tinggi' },
    { id: 'mr2', title: 'Pengecatan Kelas X-1', description: 'Cat dinding mulai mengelupas', costEstimate: 2000000, requestDate: '2024-03-15', status: 'Selesai', priority: 'Sedang' },
    { id: 'mr3', title: 'Ganti Papan Tulis XII IPA 1', description: 'Papan tulis pecah', costEstimate: 500000, requestDate: '2024-03-25', status: 'Diajukan', priority: 'Tinggi' },
    { id: 'mr4', title: 'Perbaikan Pagar Belakang', description: 'Besi keropos termakan usia', costEstimate: 3500000, requestDate: '2024-03-26', status: 'Diajukan', priority: 'Sedang' },
  ];

  private readonly systemLogs: SystemLog[] = [
    { id: 'l1', timestamp: '2024-03-26 08:30:00', user: 'Bendahara', action: 'Login', details: 'Berhasil masuk ke sistem', type: 'Info' },
    { id: 'l2', timestamp: '2024-03-26 08:35:12', user: 'Bendahara', action: 'Input Transaksi', details: 'Pembayaran SPP Andi Pratama (Maret)', type: 'Info' },
    { id: 'l3', timestamp: '2024-03-26 09:00:00', user: 'Superadmin', action: 'Backup Database', details: 'Backup harian otomatis', type: 'Info' },
    { id: 'l4', timestamp: '2024-03-25 14:20:00', user: 'System', action: 'Gagal Login', details: 'Percobaan login gagal user: admin', type: 'Warning' },
  ];

  findUserById(id: string): User | Student | undefined {
    return this.users.find((user) => user.id.toLowerCase() === id.toLowerCase());
  }
  
  getAllStudents(): Student[] {
    return this.users.filter(user => user.role === 'Siswa') as Student[];
  }

  getMaintenanceRequests(): MaintenanceRequest[] {
    return this.maintenanceRequests;
  }

  getSystemLogs(): SystemLog[] {
    return this.systemLogs;
  }

  // Helper for Kepala Sekolah Dashboard
  getFinancialStats() {
    const students = this.getAllStudents();
    let totalCollected = 0;
    let totalSPP = 0;
    let totalDU = 0;
    let totalArrears = 0;
    let transactionCount = 0;

    // Monthly Data for Chart (Simulation) - Order: Jul, Aug, Sep, Oct, Nov, Dec, Jan, Feb, Mar, Apr, May, Jun
    const monthlyIncome = [12000000, 11500000, 11000000, 10500000, 10000000, 9500000, 15000000, 14000000, 5000000, 0, 0, 0];

    students.forEach(s => {
      s.paymentHistory.forEach(p => {
        if (p.status === 'Lunas') {
          totalCollected += p.jumlah;
          transactionCount++;
          
          if (p.type === 'SPP') {
            totalSPP += p.jumlah;
          } else if (p.type === 'DU') {
            totalDU += p.jumlah;
          }
        } else {
          totalArrears += p.jumlah;
        }
      });
    });

    return { totalCollected, totalSPP, totalDU, totalArrears, transactionCount, studentCount: students.length, monthlyIncome };
  }

  // Helper for Bendahara
  getRecentTransactions() {
    const transactions: any[] = [];
    const students = this.getAllStudents();
    students.forEach(s => {
        s.paymentHistory.forEach(p => {
            if (p.status === 'Lunas') {
                transactions.push({
                    studentName: s.name,
                    studentClass: s.kelas,
                    amount: p.jumlah,
                    date: p.tanggalBayar,
                    month: p.bulan,
                    id: p.id
                });
            }
        });
    });
    // Sort by date desc (simulated as strings mostly match ISO)
    return transactions.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }
}
