import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakingOfVideo } from '../../core/models/model.interface';

@Component({
  selector: 'app-making-of',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './making-of.component.html',
  styleUrl: './making-of.component.scss'
})
export class MakingOfComponent {
  @Input() videos: MakingOfVideo[] = [];

  onVideoLoaded(event: Event): void {
    const video = event.target as HTMLVideoElement;
    if (video) {
      video.volume = 0.2; // Define volume em 20%
    }
  }
}

