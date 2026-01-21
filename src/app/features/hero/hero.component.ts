import { Component, Input, OnInit } from '@angular/core';
import { Model } from '../../core/models/model.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  @Input() modelData!: Model;
  overlayOpacity = 0;
  textColor = 'white'; // Começa branco
  showSpecs = false; // Controla a animação dos cards

  ngOnInit(): void {
    // Após 2.5 segundos, inicia a animação do overlay e muda a cor do texto
    setTimeout(() => {
      this.overlayOpacity = 0.64; // 25% mais fraco que 0.85 (0.85 * 0.75 = 0.6375 ≈ 0.64)
      // Transição suave da cor do texto de branco para preto
      this.animateTextColor();
    }, 2500);

    // Após 3.5 segundos (2.5s delay + 1s animação overlay), mostra os cards
    setTimeout(() => {
      this.showSpecs = true;
    }, 3500);
  }

  private animateTextColor(): void {
    // Anima a cor do texto de branco para preto em 1 segundo (mesmo tempo do overlay)
    const duration = 1000; // 1 segundo
    const steps = 60; // 60 frames
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Interpolação de branco (255, 255, 255) para preto (0, 0, 0)
      const r = Math.round(255 * (1 - progress));
      const g = Math.round(255 * (1 - progress));
      const b = Math.round(255 * (1 - progress));
      
      this.textColor = `rgb(${r}, ${g}, ${b})`;

      if (currentStep >= steps) {
        clearInterval(interval);
        this.textColor = 'var(--color-text-primary)'; // Cor final preta
      }
    }, stepDuration);
  }
}

