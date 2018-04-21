import * as React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as uuidv4 from 'uuid/v4';

import { NameForm } from './name.form';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { Action } from './shared/model/action';
import { SocketService } from './shared/services/socket.service';

import { toGiftMessage, toMessage } from './helpers/messageTransformer';

interface Props {
  socketService: SocketService;
}
interface State {
  showNameForm: Boolean;
  user?: User;
  messages: Array<Message>;
}
class Chat extends React.Component<Props> {
  ioConnection: any;
  state: State = {
    showNameForm: true,
    messages: []
  };
  componentDidMount() {}
  private initIoConnection(): void {
    this.props.socketService.initSocket();
    this.ioConnection = this.props.socketService
      .onMessage()
      .subscribe((message: Message) => {
        if (this.state.user && message.from._id === this.state.user._id) {
          return;
        }
        // console.log(message);
        const formatted = toGiftMessage(message);
        this.setState({
          messages: GiftedChat.append(this.state.messages, [formatted])
        });
      });
  }
  setUser(user: User) {
    if (this.state.user) {
      const previousUsername = this.state.user.name;
      const username = user.name;
      this.setState(
        {
          user: {
            ...this.state.user,
            name: user.name,
            avatar: user.avatar
          },
          showNameForm: false
        },
        () => {
          this.sendNotification(
            {
              previousUsername,
              username
            },
            Action.RENAME
          );
        }
      );
    } else {
      this.setState(
        {
          user,
          showNameForm: false
        },
        () => {
          this.initIoConnection();
          this.sendNotification(null, Action.JOINED);
        }
      );
    }
  }
  sendMessage(messages: Array<any>): void {
    this.props.socketService.send(toMessage(messages[0]));
    this.setState((previousState: State) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }
  sendNotification(params: any, action: Action): void {
    let message: Message;
    if (!this.state.user) {
      return;
    }
    switch (action) {
      case Action.JOINED:
      case Action.LEFT:
        message = {
          id: uuidv4(),
          from: this.state.user,
          action,
          createdAt: new Date().toUTCString()
        };
        break;
      case Action.RENAME:
        message = {
          id: uuidv4(),
          from: this.state.user,
          content: params,
          action,
          createdAt: new Date().toUTCString()
        };
        break;
    }
    if (message !== undefined) {
      this.setState({
        messages: GiftedChat.append(this.state.messages, [
          toGiftMessage(message)
        ])
      });
      this.props.socketService.send(message);
    }
  }
  render() {
    if (this.state.showNameForm) {
      return <NameForm onSubmit={(user: User) => this.setUser(user)} />;
    }
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages: Array<Message>) => this.sendMessage(messages)}
        user={this.state.user}
      />
    );
  }
}

export default Chat;
