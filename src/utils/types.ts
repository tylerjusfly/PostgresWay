export interface User {
  username: string;
  pass: string;
}

export interface createdUser {
  message: string;
  users: [
    {
      id: string;
      username: string;
      pass: string;
      created_at: Date;
    },
  ];
}
