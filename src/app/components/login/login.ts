import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
        email: new FormControl('', [
            Validators.required, 
            Validators.email,   
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@orange.com$/)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)
        ]),
        keepLoggedIn: new FormControl(false) // Added proper default value
    });

    get email() {
        return this.profileForm.get('email');
    }
    
    get password() {
        return this.profileForm.get('password');
    }
    
    get keepLoggedIn() {
        return this.profileForm.get('keepLoggedIn');
    }
    
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
formSubmitted = false;

 onSubmit() {
this.formSubmitted = true;

        const email = this.email?.value!;
        const password = this.password?.value!;

        if (this.profileForm.invalid  ) {
            this.profileForm.markAllAsTouched();
            return;
        }

        
        const keepLoggedIn = this.keepLoggedIn?.value || false; 

        this.authService.login(email, password, keepLoggedIn).subscribe({
            next: (user) => {
                console.log('From login form:', user);
                console.log('Login successful:', user);
                this.router.navigate([`/${user.role}-dashboard`]);
            },
            error: (err) => {
               
                console.error('Login failed:', err.message);
            }
        });
    }
}