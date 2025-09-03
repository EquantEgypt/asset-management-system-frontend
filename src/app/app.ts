import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('assets-manegement-ui');
}
