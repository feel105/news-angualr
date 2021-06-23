import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthModelService } from 'src/app/service/auth-model.service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  allNews!: any[];
  //allNews!: Observable<any[]>;
  currentDoc!: string;

  constructor(private newsService: NewsService) {
    this.newsService.getAllNews();
  }

  ngOnInit(): void {
    this.newsService.AllNews().subscribe((res: any) => {
      if (res.success) {
        this.allNews = res.payload;
        console.log(this.allNews);
      }
    });
  }

  ngOnDestroy() {
    //this.newsService.destroy();
  }
}
