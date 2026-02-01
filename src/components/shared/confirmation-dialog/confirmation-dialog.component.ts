import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  template: `
    <div class="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300" (click)="onCancel()">
      <!-- Added rounded-[2rem] and teal border accent -->
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-[400px] mx-4 transform transition-all duration-300 scale-95 animate-fade-in relative overflow-hidden" (click)="$event.stopPropagation()">
        
        <!-- Theme Accent -->
        <div class="absolute top-0 left-0 w-full h-1.5 bg-teal-400"></div>

        <div class="p-8 pb-6 flex flex-col items-center text-center">
            <!-- Icon with gradient background similar to Login Logo -->
            <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm animate-bounce-slow">
                <i class="fas fa-power-off text-red-500 text-2xl"></i>
            </div>
            
            <h3 class="text-2xl font-extrabold text-gray-900 mb-2">{{ title() }}</h3>
            <p class="text-gray-500 text-sm mb-8 leading-relaxed">{{ message() }}</p>
            
            <div class="flex gap-3 w-full">
              <button (click)="onCancel()" class="flex-1 px-5 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-bold text-sm transition-colors focus:outline-none">
                Batal
              </button>
              <button (click)="onConfirm()" class="flex-1 px-5 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-bold text-sm transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                <span>Ya, Keluar</span>
                <i class="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './confirmation-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  title = input.required<string>();
  message = input.required<string>();

  confirm = output<void>();
  cancel = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}