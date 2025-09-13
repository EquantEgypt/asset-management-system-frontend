import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { NavbarComponent } from "./navbar/navbar"; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, AngularToastifyModule, NavbarComponent,    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule],
    providers: [ToastService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('assets-manegement-ui');
}
