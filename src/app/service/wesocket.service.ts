import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WesocketService {
  private socket: any;

  constructor() {}
  connect(token: string): Subject<MessageEvent> {
    this.socket = io(environment.socketUrl, {
      query: { token },
    });

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable((observer) => {
      this.socket.on('message', (data: string) => {
        console.log('Received message from Websocket Server');
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
      next: (emitName: String, data: String) => {
        console.log('string', data);
        this.socket.emit(emitName, JSON.stringify(data));
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }
}
