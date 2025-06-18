import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../../services/poke-api.service';
import {
  FavoritesService,
  PokemonFavorite,
} from '../../services/favorites.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  imports: [IonicModule, CommonModule, RouterModule],
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: PokemonFavorite[] = [];
  offset = 0;
  limit = 20;

  constructor(
    private pokeApiService: PokeApiService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.favoritesService.init(); // importante para garantir que o storage esteja pronto
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokeApiService
      .getPokemonList(this.offset, this.limit)
      .subscribe(async (data) => {
        const updatedList = await Promise.all(
          data.map(async (pkm) => {
            const isFav = await this.favoritesService.isFavorite(pkm.name);
            return { ...pkm, isFavorite: isFav };
          })
        );

        this.pokemons.push(...updatedList);
        this.offset += this.limit;

        if (event) event.target.complete();
      });
  }

  async toggleFavorite(pokemon: PokemonFavorite) {
    await this.favoritesService.toggleFavorite(pokemon);
    pokemon.isFavorite = await this.favoritesService.isFavorite(pokemon.name);
  }

  openDetails(pokemon: PokemonFavorite) {
    this.router.navigate(['/details', pokemon.name]);
  }
}
