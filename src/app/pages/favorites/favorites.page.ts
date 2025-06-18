import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FavoritesService,
  PokemonFavorite,
} from '../../services/favorites.service';
import { MenuComponent } from 'src/app/components/menu.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, MenuComponent],
})
export class FavoritesPage {
  favorites: PokemonFavorite[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favorites = await this.favoritesService.getFavorites();
  }

  async removeFavorite(pokemon: PokemonFavorite) {
    await this.favoritesService.removeFavorite(pokemon);
    await this.loadFavorites();
  }

  openDetails(pokemon: PokemonFavorite) {
    this.router.navigate(['/details', pokemon.name]);
  }
}
