import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModelService } from 'src/app/service/auth-model.service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  addUpdateForm!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  msgErr!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private authModelService: AuthModelService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    //validation form
    this.addUpdateForm = new FormGroup({
      _id: new FormControl(),
      title: new FormControl('', [Validators.required]),
      subTitle: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    //if news edit then get details of news
    if (!this.isAddMode) {
      this.newsService.getNewsById(this.id);
      this.newsService.getNews().subscribe((response: any) => {
        if (response.success) {
          this.addUpdateForm.patchValue(response.payload);
          return;
        }
        this.router.navigate(['']);
      });
    }
  }

  //get default formvalue because of error when form load
  get formValue() {
    return this.addUpdateForm.controls;
  }

  //when form submit
  onAddUpdate() {
    this.submitted = true;
    // if form invalid then return
    if (this.addUpdateForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createNews();
    } else {
      this.updateNews();
    }
  }

  //Create News
  private createNews() {
    this.newsService.addNews(this.addUpdateForm.value);
    this.newsService.getAddNews().subscribe((response: any) => {
      if (!response.success) {
        this.msgErr = response.message;
        this.loading = false;
        return;
      }
      this.router.navigate(['']);
    });
  }

  //Update News
  private updateNews() {
    this.newsService.editNews(this.addUpdateForm.value);
    this.newsService.getEditNews().subscribe((response: any) => {
      console.log(response);
      if (!response.success) {
        this.msgErr = response.message;
        this.loading = false;
        return;
      }
      this.router.navigate(['']);
    });
  }
  ngOnDestroy() {
    console.log('des add upae com');
    //this.newsService.destroy();
  }
}
