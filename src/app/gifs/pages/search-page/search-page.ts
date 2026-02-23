import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.html',
})
export default class SearchPage implements AfterViewInit {

  searchService = inject(SearchService);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

   ngAfterViewInit() {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.searchScrollState();
  }


  onSearch(query: string) {
    this.searchService.search(query);
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;
    this.scrollStateService.searchScrollState.set(scrollTop);

    if (scrollTop + clientHeight + 350 >= scrollHeight) {
      const query = this.searchService.currentQuery();
      if (query) this.searchService.search(query);
    }
  }
}
