import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FontAwesomeModule, AngularToastifyModule],
    providers: [ToastService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('assets-manegement-ui');
}
