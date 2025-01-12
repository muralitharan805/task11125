import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phonePattern = /^[0-9]{10}$/; // Example: 10-digit phone number
    const isValid = phonePattern.test(control.value);
    return isValid ? null : { invalidPhone: true };
  };
}
@Component({
  selector: 'app-account-user-details',
  standalone: false,

  templateUrl: './account-user-details.component.html',
  styleUrl: './account-user-details.component.scss',
})
export class AccountUserDetailsComponent {
  accountUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator()]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.accountUserForm.value);
  }
}
