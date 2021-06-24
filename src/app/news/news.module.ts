import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewsListComponent, AddEditComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class NewsModule {}
