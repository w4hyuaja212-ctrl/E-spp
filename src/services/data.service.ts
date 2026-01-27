import { Injectable } from '@angular/core';
import { Student, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly users: (User | Student)[] = [
    // 1. Superadmin - Full Access / System Config
    { id: 'superadmin', name: 'Master Administrator', role: 'Superadmin' },
    
    // 2. Bendahara - Transaction Entry & Student Data
    { id: 'bendahara', name: 'Siti Aminah, S.E.', role: 'Bendahara' },
    
    // 3. Kepala Sekolah - Reporting / View Only
    { id: 'kepsek', name: 'Dr. H. Ahmad Dahlan', role: 'KepalaSekolah' },
    
    // 4. Wakil Sarana - Budget Allocation View
    { id: 'sarana', name: 'Ir. Budi Santoso', role: 'WakilSarana' },

    // 5. Siswa - Personal Data
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
        { id: 'p1', bulan: 'Januari', tahun: 2024, jumlah: 300000, status: 'Lunas', tanggalBayar: '2024-01-05' },
        { id: 'p2', bulan: 'Februari', tahun: 2024, jumlah: 300000, status: 'Lunas', tanggalBayar: '2024-02-03' },
        { id: 'p3', bulan: 'Maret', tahun: 2024, jumlah: 300000, status: 'Lunas', tanggalBayar: '2024-03-08' },
        { id: 'p4', bulan: 'April', tahun: 2024, jumlah: 300000, status: 'Belum Lunas' },
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
        { id: 'p5', bulan: 'Januari', tahun: 2024, jumlah: 300000, status: 'Lunas', tanggalBayar: '2024-01-06' },
        { id: 'p6', bulan: 'Februari', tahun: 2024, jumlah: 300000, status: 'Lunas', tanggalBayar: '2024-02-09' },
        { id: 'p7', bulan: 'Maret', tahun: 2024, jumlah: 300000, status: 'Belum Lunas' },
        { id: 'p8', bulan: 'April', tahun: 2024, jumlah: 300000, status: 'Belum Lunas' },
      ],
    },
  ];

  findUserById(id: string): User | Student | undefined {
    return this.users.find((user) => user.id.toLowerCase() === id.toLowerCase());
  }
  
  getAllStudents(): Student[] {
    return this.users.filter(user => user.role === 'Siswa') as Student[];
  }

  // Helper for Kepala Sekolah Dashboard
  getFinancialStats() {
    const students = this.getAllStudents();
    let totalCollected = 0;
    let totalArrears = 0;
    let transactionCount = 0;

    students.forEach(s => {
      s.paymentHistory.forEach(p => {
        if (p.status === 'Lunas') {
          totalCollected += p.jumlah;
          transactionCount++;
        } else {
          totalArrears += p.jumlah;
        }
      });
    });

    return { totalCollected, totalArrears, transactionCount, studentCount: students.length };
  }
}
