import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'gif-history',
  templateUrl: './gif-history.html',
})
export default class GifHistory {

  searchService = inject(SearchService);

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query']))
  );

  gifsByKey = computed(() => {
    return this.searchService.getHistoryGifs(this.query() ?? '');
  });

  gifsByKeyGroup = computed<any[][]>(() => {
    const gifs = this.gifsByKey();
    const groups = [];
    for (let i = 0; i < gifs.length; i += 3) {
      groups.push(gifs.slice(i, i + 3));
    }
    return groups;
  });
}
