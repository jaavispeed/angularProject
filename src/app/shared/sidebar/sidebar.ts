import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';
import { SideBarMenu } from './sidebar-nav.config';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);
  menuItems = SideBarMenu;

  user = computed(() => this.authService.user());

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
