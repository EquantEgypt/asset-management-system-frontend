import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})

export class Login {

    showPassword = false;
    errorMessage: string | null = null;
    constructor(private authService: AuthService, private router: Router, private toast: ToastService) { }

    profileForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@orange.com$/)
        ]),
        password: new FormControl('', [
            Validators.required
        ]),
        keepLoggedIn: new FormControl(false)
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


    onSubmit() {
        const email = this.email?.value!;
        const password = this.password?.value!;


        const keepLoggedIn = this.keepLoggedIn?.value || false;
        if (this.profileForm.valid) {
            this.authService.login(email, password, keepLoggedIn).subscribe({
                next: (user) => {
                    this.errorMessage = null

                },
                error: (err) => {
                    this.errorMessage = 'Invalid email or password. Please try again.';
                }
            });
        }

    }
}