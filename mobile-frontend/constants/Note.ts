import { User } from './User';

export type Note = {
  id: number;
  title: string;
  HTMLcontent: string;
  unformattedContent: string;
  createdAt: string;
  updatedAt: string;
  user: User[];
};