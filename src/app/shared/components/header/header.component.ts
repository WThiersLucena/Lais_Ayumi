import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isVisible = true;
  lastScrollTop = 0;

  ngOnInit(): void {
    this.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Verifica se rolou para baixo
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      // Rolando para baixo - esconde o header
      this.isVisible = false;
      this.isScrolled = true;
    } else {
      // Rolando para cima - mostra o header
      this.isVisible = true;
    }
    
    // Atualiza se passou do topo
    if (scrollTop > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

