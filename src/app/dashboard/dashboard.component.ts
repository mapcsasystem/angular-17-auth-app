import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dasboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public user = computed(() => this.authService.currentUser());

  // get user(): WritableSignal<User | null> {
  //   return this.authService.currentUser();
  // }
  onLogout(): void {
    this.authService.logout();
    // this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}
