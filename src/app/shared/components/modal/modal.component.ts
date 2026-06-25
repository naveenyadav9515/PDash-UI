import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener, ElementRef, inject, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements AfterViewChecked {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() icon = '';
  
  @Output() onClose = new EventEmitter<void>();

  private readonly elementRef = inject(ElementRef);
  private focusableElements: HTMLElement[] = [];
  private hasInitializedFocus = false;

  ngAfterViewChecked(): void {
    if (this.isOpen && !this.hasInitializedFocus) {
      this.updateFocusableElements();
      if (this.focusableElements.length) {
        // Try focusing the first interactive element (ignoring the close button if possible)
        const elementToFocus = this.focusableElements.length > 1 ? this.focusableElements[1] : this.focusableElements[0];
        elementToFocus.focus();
      }
      this.hasInitializedFocus = true;
    } else if (!this.isOpen) {
      this.hasInitializedFocus = false;
    }
  }

  close(): void {
    this.onClose.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    this.close();
  }

  handleContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTabPress(event: KeyboardEvent): void {
    if (!this.isOpen) return;
    
    this.updateFocusableElements();
    if (this.focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  private updateFocusableElements(): void {
    const focusableSelectors = 'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])';
    const elements = this.elementRef.nativeElement.querySelectorAll(focusableSelectors);
    this.focusableElements = Array.from(elements) as HTMLElement[];
  }
}
