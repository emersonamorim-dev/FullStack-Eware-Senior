import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  notifications = [
    'Vai Palmeiras!!',
    'Emerson Amorim',
    'Full Stack Senior'
  ];

  isMenuOpen = false;

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
  }


  logout() {
  }
}
