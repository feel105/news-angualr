import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    NewsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    //SocketIoModule.forRoot(config),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
