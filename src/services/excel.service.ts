import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Student, SystemLog } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  exportToExcel(students: Student[], logs: SystemLog[], fileName: string): void {
    // 1. Prepare Data for "Data Siswa" Sheet
    const studentData = students.map(s => ({
      'ID User / NIS': s.id,
      'Nama Lengkap': s.name,
      'Kelas': s.kelas,
      'NISN': s.nisn,
      'No. WhatsApp': s.noWa,
      'Status': s.statusSiswa,
      'Tahun Masuk': s.tahunMasuk,
      'Nominal SPP': s.nominalSpp
    }));

    // 2. Prepare Data for "Transaksi" Sheet (Flattened)
    const transactionData: any[] = [];
    students.forEach(s => {
      s.paymentHistory.forEach(p => {
        transactionData.push({
          'ID Transaksi': p.id,
          'Nama Siswa': s.name,
          'Kelas': s.kelas,
          'Bulan': p.bulan,
          'Tahun': p.tahun,
          'Jumlah (Rp)': p.jumlah,
          'Status': p.status,
          'Tanggal Bayar': p.tanggalBayar || '-',
          'Petugas': p.petugas || '-'
        });
      });
    });

    // 3. Prepare Data for "System Logs" Sheet
    const logData = logs.map(l => ({
      'Timestamp': l.timestamp,
      'User': l.user,
      'Action': l.action,
      'Details': l.details,
      'Type': l.type
    }));

    // 4. Create Worksheets
    const wsStudents: XLSX.WorkSheet = XLSX.utils.json_to_sheet(studentData);
    const wsTransactions: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transactionData);
    const wsLogs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(logData);

    // 5. Create Workbook and Append Sheets
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsStudents, 'Data Siswa');
    XLSX.utils.book_append_sheet(wb, wsTransactions, 'Riwayat Transaksi');
    XLSX.utils.book_append_sheet(wb, wsLogs, 'Log Sistem');

    // 6. Write File (Real .xlsx)
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
