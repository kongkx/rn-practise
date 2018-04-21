import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as socketIo from 'socket.io-client';
import { Message } from '../model/message';
import { Event } from '../model/event';

const SERVER_URL = 'http://192.168.3.22:8088';

export class SocketService {
  private socket;
  public initSocket(): void {
    console.log('initSocket', SERVER_URL);
    this.socket = socketIo(SERVER_URL);
  }
  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
