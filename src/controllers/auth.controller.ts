import { Request, Response } from "express";
import { pool } from "../utils/database";
import { QueryResult } from "pg";
import { User } from "../utils/types";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, pass }: User = req.body;
    const result = await pool.query("INSERT INTO users(username, pass)VALUES($1, $2)", [username, pass]);
    return res.status(201).json({ message: "success", user: `Welcome Home ${username}` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "error", err: error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const result: QueryResult = await pool.query("SELECT * FROM users");
  return res.status(200).json({ message: "success", users: result.rows });
};
