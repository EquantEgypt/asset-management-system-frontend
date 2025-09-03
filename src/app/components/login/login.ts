import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    profileForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
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
    onSubmit() {
        console.log(this.profileForm.value);
    }
}
