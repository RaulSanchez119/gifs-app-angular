import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { TrendingService } from '../../services/trending.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {

  trendingService = inject(TrendingService);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit() {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();

    setTimeout(() => {
      scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
    }, 50);
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (scrollTop + clientHeight + 350 >= scrollHeight) {
      this.trendingService.loadTrendingGifs();
    }
  }
}
