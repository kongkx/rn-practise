import { User } from './user';
import { Action } from './action';

export interface Message {
  id: string;
  from?: User;
  content?: any;
  action?: Action;
  createdAt: string;
}
