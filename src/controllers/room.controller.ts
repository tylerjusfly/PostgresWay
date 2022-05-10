import { pool } from "../utils/database";
import { Request, Response } from "express";
import { IRoom } from "../utils/types";
import { QueryParse, QueryResult } from "pg";

export const addRoom = async (req: Request, res: Response) => {
  const { topic }: IRoom = req.body;
  try {
    const result = await pool.query("INSERT INTO rooms(topic)VALUES($1)", [topic]);
    return res.status(201).json({ msg: "success", room: `Room ${topic} Has Been Added` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "error", room: error });
  }
};

export const getAllRoom = async (req: Request, res: Response) => {
  const result: QueryResult = await pool.query("SELECT * FROM rooms");
  return res.status(200).json({ rooms: result.rows });
};

export const viewRoom = async (req: Request, res: Response) => {
  const { roomName } = req.body;
  try {
    const roomResult = await pool.query("SELECT * FROM rooms WHERE topic = $1", [roomName]);
    if (roomResult.rowCount == 0) {
      return res.json("this room does not exist");
    }
    let selectPosts = await pool.query("SELECT * FROM posts WHERE roomid = $1", [roomResult.rows[0].roomid]);
    if (selectPosts.rowCount == 0) {
      return res.json("this room does not exist");
    }
    return res.status(200).json({ message: `Welcome to room ${roomResult.rows[0].topic}`, posts: selectPosts.rows });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "error", room: error });
  }
};
