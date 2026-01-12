import { Component, Input } from '@angular/core';
import { Model } from '../../core/models/model.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() modelData!: Model;
}

