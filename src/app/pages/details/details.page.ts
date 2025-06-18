import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { PokeApiService } from '../../services/poke-api.service';
import { FavoritesService } from '../../services/favorites.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  pokemonName = '';
  pokemonDetails: any;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private favoritesService: FavoritesService
  ) {}

  async ngOnInit() {
    this.pokemonName = this.route.snapshot.paramMap.get('name') || '';
    await this.loadData();
  }

  async loadData() {
    try {
      const details = await firstValueFrom(
        this.pokeApiService.getPokemonDetails(this.pokemonName)
      );
      const species = await firstValueFrom(
        this.pokeApiService.getPokemonSpecies(this.pokemonName)
      );

      this.pokemonDetails = {
        ...details,
        flavorText:
          species.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'en'
          )?.flavor_text || '',
      };

      this.isFavorite = await this.favoritesService.isFavorite(
        this.pokemonName
      );
    } catch (err) {
      console.error('Erro ao carregar dados do Pokémon:', err);
    }
  }

  async toggleFavorite() {
    if (!this.pokemonDetails) return;

    const basicInfo = {
      name: this.pokemonDetails.name,
      id: this.pokemonDetails.id,
      image: this.pokemonDetails.sprites.front_default,
    };

    if (this.isFavorite) {
      await this.favoritesService.removeFavorite(basicInfo);
    } else {
      await this.favoritesService.addFavorite(basicInfo);
    }

    this.isFavorite = !this.isFavorite;
  }

  getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    return typeColors[type.toLowerCase()] || '#777';
  }
}
