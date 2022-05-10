import { pool } from "../utils/database";
import { Request, Response } from "express";
import { QueryResult } from "pg";

export const createPost = async (req: Request, res: Response) => {
  const { subject, body, roomid } = req.body;
  try {
    const room: QueryResult = await pool.query("SELECT * FROM rooms WHERE roomid = $1", [roomid]);
    if (room.rowCount == 0) {
      return res.json("this room does not exist");
    }

    // if room exist create post
    let post: QueryResult = await pool.query("INSERT INTO posts(subject, body, roomid)VALUES($1, $2, $3)", [
      subject,
      body,
      room.rows[0].roomid,
    ]);
    return res
      .status(201)
      .json({ status: "success", message: `post successfuly posted to ${room.rows[0].topic} Room` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "Error", post: "an error occured" });
  }
};
