import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = computed(() => this.authService.user());

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
