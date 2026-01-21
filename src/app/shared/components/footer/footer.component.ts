import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeGameComponent } from '../snake-game/snake-game.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SnakeGameComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  thiersUrl = 'https://thiers.vercel.app/';
  qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(this.thiersUrl)}`;
  showGameModal = false;

  toggleGameModal(): void {
    this.showGameModal = !this.showGameModal;
    if (this.showGameModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeGameModal(): void {
    this.showGameModal = false;
    document.body.style.overflow = '';
  }
}

