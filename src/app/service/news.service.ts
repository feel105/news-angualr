import { Injectable } from '@angular/core';
import { News } from '../model/News';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WesocketService } from './wesocket.service';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModelService } from './auth-model.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private socket: any;

  constructor(private authModelService: AuthModelService) {
    const currentUser = this.authModelService.currentAuthorValue;
    const token = currentUser.authToken;
    //socket connect using Token
    this.socket = io(environment.socketUrl, {
      query: { token },
    });
  }

  //getNews by News id
  getNewsById(data: News) {
    this.socket.emit('getNewsById', data);
  }

  //Add News
  addNews(data: News) {
    this.socket.emit('addNews', data);
  }

  //edit News
  editNews(data: News) {
    this.socket.emit('editNews', data);
  }

  getAllNews() {
    this.socket.emit('allNews', '');
  }
  //received All news from Socket
  AllNews() {
    return Observable.create((observer: any) => {
      this.socket.on('allNews', (message: any) => {
        observer.next(message);
      });
    });
    /*this.socket.on('allNews', (data: any) => {
      console.log('Received allNews from Websocket Server', data);
    });*/
  }
}
