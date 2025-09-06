import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'angular-toastify';

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

    constructor(private authService: AuthService, private router: Router, private toast: ToastService) {}

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

        if (this.profileForm.invalid  ) {
            this.profileForm.markAllAsTouched();
                  this.toast.error('Please fill in all required fields correctly.');

            return;
        }

        
        const keepLoggedIn = this.keepLoggedIn?.value || false; 

        this.authService.login(email, password, keepLoggedIn).subscribe({
            next: (user) => {
                this.toast.success('Login successful')
                console.log('Login successful:', user);
            },
            error: (err) => {
                let message='Login Failed';
                if(err.status==401) message='wrong credentials';
                 else if(err.status==500) message='server error ';

     this.toast.error(message);

                console.error('Login failed:', err);
            }
        });
    }
}