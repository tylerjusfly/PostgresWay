import { pool } from "../utils/database";
import { Request, Response } from "express";
import { IComment } from "../utils/types";

export const addComment = async (req: Request, res: Response) => {
  const { roomName, postId, comment }: IComment = req.body;
  try {
    const room = await pool.query("SELECT * FROM rooms WHERE topic = $1", [roomName]);
    if (room.rowCount == 0) {
      return res.json("this room does not exist");
    }

    // else if room exist , check if post exist
    const post = await pool.query("SELECT * FROM posts WHERE postid = $1", [postId]);
    if (post.rowCount == 0) {
      return res.json("this post does not exist");
    }
    // else if exits, add comment to post and save comment
    await pool.query("UPDATE posts SET comments = array_append(comments, $1) WHERE postid = $2", [
      comment,
      post.rows[0].postid,
    ]);

    // getting post and returning comments
    const savedPost = await pool.query("SELECT * FROM posts WHERE postid = $1", [post.rows[0].postid]);
    return res.status(200).json({ heading: `Welcome to the ${room.rows[0].topic} Room`, post: savedPost.rows });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ status: "Error", post: "an error occured" });
  }
};
