export interface User {
  username: string;
  pass: string;
}

export interface IRoom {
  topic: string;
}

export interface IComment {
  roomName: string;
  postId: string;
  comment: string;
}
