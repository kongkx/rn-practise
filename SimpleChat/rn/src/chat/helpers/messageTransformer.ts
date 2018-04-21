import { Message } from '../shared/model/message';
import { Action } from '../shared/model/action';

export const toGiftMessage = (message: Message) => {
  if (message.action !== undefined) {
    switch (message.action) {
      case Action.JOINED:
        return {
          _id: message.id,
          text: `${message.from.name}  joined to the conversation.`,
          createdAt: message.createdAt,
          system: true
        };
      case Action.LEFT:
        return {
          _id: message.id,
          text: `${message.from.name}  left to the conversation.`,
          createdAt: message.createdAt,
          system: true
        };
      case Action.RENAME:
        return {
          _id: message.id,
          text: `${message.content.previousUsername} is now ${
            message.content.username
          }`,
          createdAt: message.createdAt,
          system: true
        };
      default:
        return {
          _id: message.id,
          text: message.content,
          createdAt: message.createdAt,
          system: true
        };
    }
  }
  return {
    _id: message.id,
    text: message.content,
    createdAt: message.createdAt,
    user: message.from
  };
};

export const toMessage = (message: any) => {
  return {
    id: message._id,
    content: message.text,
    from: message.user,
    createdAt: message.createdAt
  };
};
