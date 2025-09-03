import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
     constructor(private AuthService: AuthService) {}
      showPassword = false; // default: hidden

    profileForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email,   Validators.pattern(/^[a-zA-Z0-9._%+-]+@orange.com$/)
]),
        password: new FormControl('', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)
])

    });
get name() {
        return this.profileForm.get('name');
    }
    get email() {
        return this.profileForm.get('email');
    }
    get password() {
        return this.profileForm.get('password');
    }
    togglePassword() {
    this.showPassword = !this.showPassword;
  }

   onSubmit() {
  if (this.profileForm.invalid) {
    // mark all controls as touched so errors show up
    this.profileForm.markAllAsTouched();
    return;
  }

this.AuthService.login(this.email!.value!, this.password!.value!).subscribe({
    next: (response) => {
      console.log(' Login successful:', response);
      // maybe save token, navigate, etc.
    },
    error: (err) => {
      console.error(' Login failed:', err);
    }
  });
}

}
