import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  return res.json({ message: "Welcome To Index Page" });
};

/*
 * Room as Tickets
 * Posts as each customers complain
 * and comments has chats
 */
