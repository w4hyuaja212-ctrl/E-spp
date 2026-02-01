import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private http = inject(HttpClient);
  // URL App Script yang Anda berikan
  private readonly API_URL = 'https://script.google.com/macros/s/AKfycbzCzO3lB24Bp2W0GJMZPfHPtW6VjbC9wMsCWZlgTy6WaBpMxykg2TV9P-SSjjrIRSeqyw/exec';

  isLoading = signal(false);
  
  // Method generik untuk mengambil data per sheet
  fetchSheet(sheetName: string): Observable<any> {
    this.isLoading.set(true);
    // Asumsi App Script menerima parameter ?sheet=NamaSheet atau ?action=read&sheet=...
    // Menggunakan mode 'no-cors' biasanya tidak mengembalikan data JSON secara langsung di browser client-side murni tanpa proxy,
    // tapi jika App Script dikonfigurasi sebagai JSONP atau CORS enabled (ContentService.createTextOutput), ini akan bekerja.
    return this.http.get(`${this.API_URL}?action=read&sheet=${sheetName}`).pipe(
      tap(() => this.isLoading.set(false)),
      catchError(err => {
        console.error(`Error fetching ${sheetName}:`, err);
        this.isLoading.set(false);
        return of([]);
      })
    );
  }

  // Helper untuk mengambil semua data master saat inisialisasi
  syncAllData() {
    // Implementasi logika sinkronisasi ke DataService bisa dilakukan disini
    // Contoh:
    // this.fetchSheet('Data_Siswa').subscribe(data => ... update local state ...);
  }
}
