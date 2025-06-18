import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface PokemonFavorite {
  name: string;
  id: number;
  image: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  /**
   * Inicializa o armazenamento local
   * Deve ser chamado em algum ponto da aplicação (ex: AppComponent ou HomePage)
   */
  async init() {
    const store = await this.storage.create();
    this._storage = store;
  }

  /**
   * Retorna a lista de favoritos
   */
  async getFavorites(): Promise<PokemonFavorite[]> {
    const favorites = await this._storage?.get('favorites');
    return favorites || [];
  }

  /**
   * Adiciona um Pokémon à lista de favoritos, se ainda não estiver presente
   */
  async addFavorite(pokemon: PokemonFavorite): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      favorites.push(pokemon);
      await this._storage?.set('favorites', favorites);
    }
  }

  /**
   * Remove um Pokémon da lista de favoritos
   */
  async removeFavorite(pokemon: PokemonFavorite): Promise<void> {
    const favorites = await this.getFavorites();
    const updated = favorites.filter((fav) => fav.name !== pokemon.name);
    await this._storage?.set('favorites', updated);
  }

  /**
   * Verifica se um Pokémon está nos favoritos
   */
  async isFavorite(pokemonName: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some((fav) => fav.name === pokemonName);
  }

  /**
   * Alterna entre adicionar/remover um favorito
   */
  async toggleFavorite(pokemon: PokemonFavorite): Promise<void> {
    const isFav = await this.isFavorite(pokemon.name);
    if (isFav) {
      await this.removeFavorite(pokemon);
    } else {
      await this.addFavorite(pokemon);
    }
  }
}
