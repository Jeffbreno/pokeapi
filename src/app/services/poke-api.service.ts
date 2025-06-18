// Serviço responsável pela comunicação com a PokeAPI
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  // URL base da PokeAPI para pokémons
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  /**
   * Busca a lista de pokémons com paginação
   * @param offset Índice inicial dos dados
   * @param limit Quantidade de pokémons por página (padrão: 20)
   * @returns Observable com lista de pokémons contendo nome e URL
   */
  getPokemonList(offset: number = 0, limit: number = 20): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response) =>
          response.results.map((pokemon: any) => {
            const id = this.extractIdFromUrl(pokemon.url);
            return {
              name: pokemon.name,
              id,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
          })
        )
      );
  }

  /**
   * Busca os dados detalhados de um pokémon
   * @param name Nome ou ID do pokémon
   * @returns Observable com detalhes do pokémon
   */
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${name}`);
  }

  /**
   * Busca informações adicionais sobre a espécie do pokémon
   * @param name Nome ou ID do pokémon
   * @returns Observable com dados da espécie
   */
  getPokemonSpecies(name: string): Observable<any> {
    return this.http.get<any>(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );
  }

  /**
   * Busca dados combinados do pokémon (detalhes + espécie)
   * Útil para a tela de detalhes com mais informações
   * @param name Nome ou ID do pokémon
   * @returns Observable com ambos os resultados em um objeto
   */
  getCompletePokemonInfo(name: string): Observable<any> {
    return forkJoin({
      details: this.getPokemonDetails(name),
      species: this.getPokemonSpecies(name),
    });
  }

  /**
   * Busca um Pokémon pelo nome (exato), retorna dados simplificados
   * Obs.: Pode retornar null se não encontrar e a api não disponibiliza busca parcial
   *       então é necessário buscar pelo nome exato
   * @param name Nome do Pokémon
   * @returns Observable com objeto do Pokémon ou null se não encontrado
   */
  searchPokemonByName(name: string): Observable<any | null> {
    return this.http.get<any>(`${this.baseUrl}/${name.toLowerCase()}`).pipe(
      map((data) => {
        return {
          name: data.name,
          id: data.id,
          image: data.sprites.front_default,
          types: data.types.map((t: any) => t.type.name),
        };
      }),
      // Se erro, retorna null
      catchError(() => of(null))
    );
  }

  /**
   * Extrai o ID do Pokémon a partir da URL fornecida pela API
   * @param url URL do Pokémon
   * @returns ID extraído como string
   */
  private extractIdFromUrl(url: string): string {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : '';
  }
}
