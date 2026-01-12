import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './features/hero/hero.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { MakingOfComponent } from './features/making-of/making-of.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { modelData } from './core/models/model.data';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    PortfolioComponent,
    MakingOfComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  modelData = modelData;
}
