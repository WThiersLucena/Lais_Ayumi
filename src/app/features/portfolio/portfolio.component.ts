import { Component, Input, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Model } from '../../core/models/model.interface';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  @Input() portfolioImages: string[] = [];
  
  currentIndex = 0;
  visibleImages: string[] = [];
  itemsPerView = 3;
  
  // Lightbox
  lightboxOpen = false;
  lightboxImageIndex = 0;
  lightboxImage = '';

  ngOnInit(): void {
    this.updateVisibleImages();
    this.calculateItemsPerView();
  }

  calculateItemsPerView(): void {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) {
        this.itemsPerView = 3;
      } else if (window.innerWidth >= 768) {
        this.itemsPerView = 2;
      } else {
        this.itemsPerView = 1;
      }
      this.updateVisibleImages();
    }
  }

  updateVisibleImages(): void {
    const end = Math.min(this.currentIndex + this.itemsPerView, this.portfolioImages.length);
    this.visibleImages = this.portfolioImages.slice(this.currentIndex, end);
  }

  next(): void {
    if (this.currentIndex + this.itemsPerView < this.portfolioImages.length) {
      this.currentIndex += this.itemsPerView;
      this.updateVisibleImages();
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex = Math.max(0, this.currentIndex - this.itemsPerView);
      this.updateVisibleImages();
    }
  }

  canGoNext(): boolean {
    return this.currentIndex + this.itemsPerView < this.portfolioImages.length;
  }

  canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  goToImage(index: number): void {
    this.currentIndex = index;
    this.updateVisibleImages();
  }

  // Lightbox methods
  openLightbox(image: string, index: number): void {
    this.lightboxImage = image;
    this.lightboxImageIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Previne scroll do body
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextLightboxImage(): void {
    if (this.lightboxImageIndex < this.portfolioImages.length - 1) {
      this.lightboxImageIndex++;
      this.lightboxImage = this.portfolioImages[this.lightboxImageIndex];
    }
  }

  previousLightboxImage(): void {
    if (this.lightboxImageIndex > 0) {
      this.lightboxImageIndex--;
      this.lightboxImage = this.portfolioImages[this.lightboxImageIndex];
    }
  }

  canGoNextLightbox(): boolean {
    return this.lightboxImageIndex < this.portfolioImages.length - 1;
  }

  canGoPreviousLightbox(): boolean {
    return this.lightboxImageIndex > 0;
  }

  onLightboxBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.nextLightboxImage();
    } else if (event.key === 'ArrowLeft') {
      this.previousLightboxImage();
    }
  }
}

