import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
import { AppHeaderComponent } from '../app-header/app-header';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, AngularToastifyModule, AppHeaderComponent, CommonModule],
  providers: [ToastService],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  userEmail: string = '';
  isLoggedIn: boolean = false;

  private subs = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subs.add(
      this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      })
    );

    this.subs.add(
      this.authService.user$.subscribe(user => {
        this.userEmail = user?.email || '';
      })
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  protected readonly title = signal('assets-manegement-ui');


}
