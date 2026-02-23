import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const data = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(data);
};

@Injectable({ providedIn: 'root' })
export class SearchService {

  private http = inject(HttpClient);

  searchGifs = signal<Gif[]>([]);
  searchGifsLoading = signal(false);
  private searchPage = signal(0);
  currentQuery = signal('');

  searchGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.searchGifs().length; i += 3) {
      groups.push(this.searchGifs().slice(i, i + 3));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  search(query: string): void {
    if (query !== this.currentQuery()) {
      this.currentQuery.set(query);
      this.searchPage.set(0);
      this.searchGifs.set([]);
    }

    if (this.searchGifsLoading()) return;
    this.searchGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.gifhyUrl}/gifs/search`, {
      params: {
        api_key: environment.gifhyApiKey,
        limit: 20,
        q: query,
        offset: this.searchPage() * 20,
      }
    }).pipe(
      map(({ data }) => data),
      map(items => GifMapper.mapGiphyItemToGifArray(items)),

    ).subscribe(gifs => {
      this.searchGifs.update(current => [...current, ...gifs]);
      this.searchPage.update(p => p + 1);
      this.searchGifsLoading.set(false);

      this.searchHistory.update(history => ({
        ...history,
        [query.toLocaleLowerCase()]: this.searchGifs(),
      }));
    });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
