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
    this.connectSocket();
    // const currentUser = this.authModelService.currentAuthorValue;
    // const token = currentUser.authToken;
    // //socket connect using Token
    // this.socket = io(environment.socketUrl, {
    //   query: { token },
    // });
  }

  connectSocket() {
    const currentUser = this.authModelService.currentAuthorValue;
    const token = currentUser.authToken;
    //socket connect using Token
    this.socket = io(environment.socketUrl, {
      query: { token },
    });
  }

  disconnectSocket() {
    this.socket.disconnect();
  }

  //getNews by News id
  getNewsById(id: string) {
    this.socket.emit('getNewsById', id);
  }

  //Add News
  addNews(data: News) {
    this.socket.emit('addNews', data);
  }

  //edit News
  editNews(data: News) {
    this.socket.emit('editNews', data);
  }

  //delete News
  delete(id: string) {
    this.socket.emit('deleteNews', id);
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
  }
  getNews() {
    return new Observable((observer) => {
      this.socket.on('getNewsById', (msg: any) => {
        observer.next(msg);
      });
    });
  }
  getAddNews() {
    return new Observable((observer) => {
      this.socket.on('addNews', (msg: any) => {
        observer.next(msg);
      });
    });
  }
  getEditNews() {
    return new Observable((observer) => {
      this.socket.on('editNews', (msg: any) => {
        observer.next(msg);
      });
    });
  }
  getDeleteNews() {
    return new Observable((observer) => {
      this.socket.on('deleteNews', (msg: any) => {
        observer.next(msg);
      });
    });
  }
}
