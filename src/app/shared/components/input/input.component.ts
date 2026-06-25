import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputType = 'text' | 'password' | 'email' | 'number';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() error = '';
  @Input() disabled = false;
  
  value = '';
  isFocused = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(val: any): void {
    if (val !== undefined && val !== null) {
      this.value = val;
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  handleFocus(): void {
    this.isFocused = true;
  }

  handleBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }
}
