import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  AfterViewInit,
  QueryList,
  ElementRef
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatList,
  MatListItem
} from '@angular/material';
import * as uuidv4 from 'uuid/v4';

import { Action } from './shared/model/action';
import { Event } from './shared/model/event';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogUserType } from './dialog-user/dialog-user-type';
console.log(DialogUserType);
const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
      dialogType: DialogUserType.NEW
    }
  };

  @ViewChild(MatList, { read: ElementRef })
  matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef })
  matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initModel();
    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private initModel(): void {
    const randomId = uuidv4();
    this.user = {
      _id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log('connected');
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('disconnected');
    });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Edit Details',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        this.sendNotification(paramsDialog, Action.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.sendNotification(paramsDialog, Action.RENAME);
      }
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      id: uuidv4(),
      from: this.user,
      content: message,
      createdAt: new Date().toISOString()
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        id: uuidv4(),
        from: this.user,
        action: action,
        createdAt: new Date().toISOString()
      };
    } else if (action === Action.RENAME) {
      message = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}
