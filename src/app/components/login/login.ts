import { CommonModule } from '@angular/common';
import { Component, ContentChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  faLock = faLock;
    showPassword = false;
     constructor(private authService: AuthService, private router: Router) {}

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
            this.profileForm.markAllAsTouched();
            return;
        }

        const email = this.email?.value!;
        const password = this.password?.value!;

        // Fixed: Use correct service name and fixed template literal
        this.authService.login(email, password).subscribe({
            next: (user) => {
                console.log('from logn form' + user)
                console.log('Login successful:', user);
                // Fixed: Use 'user' instead of undefined variable, proper template literal
                this.router.navigate([`/${user.role}-dashboard`]);
            },
            error: (err) => {
                console.error('Login failed:', err.message);
            }
        });
    }
}
