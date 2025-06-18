import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../../services/poke-api.service';
import {
  FavoritesService,
  PokemonFavorite,
} from '../../services/favorites.service';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../../components/menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    MenuComponent,
    FormsModule,
  ],
})
export class HomePage implements OnInit {
  pokemons: PokemonFavorite[] = [];
  offset = 0;
  limit = 20;
  searchTerm: string = '';

  constructor(
    private pokeApiService: PokeApiService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.favoritesService.init();
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

  searchPokemons() {
    if (!this.searchTerm.trim()) {
      // Se busca vazia, recarrega lista inicial
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
      return;
    }

    this.pokeApiService
      .searchPokemonByName(this.searchTerm.toLowerCase())
      .subscribe(async (pokemon) => {
        // O serviço deve retornar 1 pokemon ou erro
        if (pokemon) {
          // Ajusta se é favorito
          const isFav = await this.favoritesService.isFavorite(pokemon.name);
          this.pokemons = [{ ...pokemon, isFavorite: isFav }];
        } else {
          this.pokemons = [];
        }
      });
  }
}
