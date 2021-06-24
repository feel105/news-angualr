import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Author } from 'src/app/model';
import { AuthModelService } from 'src/app/service/auth-model.service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  allNews!: any[];
  currentAuthor!: Author;
  isDeleting!: boolean;
  msgErr!: string;
  addCommentForm!: FormGroup;

  constructor(
    private newsService: NewsService,
    private authModelService: AuthModelService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.newsService.connectSocket();
    this.newsService.getAllNews();
    this.currentAuthor = this.authModelService.currentAuthorValue;
  }

  ngOnInit(): void {
    this.newsService.AllNews().subscribe((res: any) => {
      if (res.success) {
        this.allNews = res.payload;
        console.log(this.allNews);
      }
    });
    this.addCommentForm = new FormGroup({
      _id: new FormControl(),
      comment: new FormControl('', [Validators.required]),
      news_id: new FormControl('', [Validators.required]),
    });
  }

  //delete News
  deleteNews(id: string) {
    const news = this.allNews.find((x) => x._id === id);
    news.isDeleting = true;
    this.newsService.delete(id);
    this.newsService.getDeleteNews().subscribe((response: any) => {
      if (!response.success) {
        this.msgErr = response.message;
        this.isDeleting = false;
        return;
      }
    });
  }

  //get default formvalue because of error when form load
  get formValue() {
    return this.addCommentForm.controls;
  }

  //when form submit
  onAddComment(id: string) {
    const news = this.allNews.find((x) => x._id === id);
    news.submitted = true;
    // if form invalid then return
    if (this.addCommentForm.invalid) {
      return;
    }
    news.loading = true;
    news.msgErr = true;
    console.log(this.addCommentForm.value);
  }

  ngOnDestroy() {
    console.log('des list com');
    this.newsService.disconnectSocket();
  }
}
