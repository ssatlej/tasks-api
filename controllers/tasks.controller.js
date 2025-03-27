import express from "express";
import pool from "../database/index.js";

const router = express.Router();

export const addTasks = async (req, res) => {
    try {
        const { title, description, due_date, image_url } = req.body;
        const userId = req?.user?.id
        if (!title || !due_date || !userId ) {
            return res.status(400).json({ success: false, message: "Title, due date, and user ID are required." });
        }
        
        const result = await pool.query(
            "INSERT INTO tasks (title, description, due_date, image_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [title, description, due_date, image_url, !userId]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


export const listTasks = async (req, res) => {
    try{
        const userId = req?.user?.id
        const result = await pool.query(
            "SELECT id, title, description, due_date, image_url, user_id FROM tasks WHERE user_id = $1 ORDER BY due_date ASC",
            [userId]
          );
          res.status(200).json({ success: true, data: result.rows });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export const getTaskById = async (req, res) => {
    try{
        const id = req.params.id
        const result = await pool.query(
            "SELECT id, title, description, due_date, image_url, user_id FROM tasks ORDER BY due_date ASC WHERE id = $1 ",
            [id]
          );
          res.status(200).json({ success: true, data: result.rows });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req?.user?.id;

        const { title, description, due_date, image_url } = req.body;

        if (!title || !due_date || !userId) {
            return res.status(400).json({ success: false, message: "Title, due date, and user ID are required." });
        }

        const result = await pool.query(
            `UPDATE tasks 
             SET title = $1, description = $2, due_date = $3, image_url = $4 
             WHERE id = $5 AND user_id = $6 
             RETURNING *`,
            [title, description, due_date, image_url, id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Task not found or unauthorized." });
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user?.id

        const result = await pool.query(
            `UPDATE tasks 
             SET status = 1 
             WHERE id = $1 AND user_id = $2 AND status = 0
             RETURNING *`,
            [ id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Task not found or unauthorized." });
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const updateImage = async (req, res) => {
    try {
        const id = req.params?.id;
        const userId = req.user?.id;
        const image_url = req.body?.image_url;

        const result = await pool.query(
            `UPDATE tasks 
             SET image_url = $1
             WHERE id = $1 AND user_id = $2 AND status = 0
             RETURNING *`,
            [ image_url, id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Task not found or unauthorized." });
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default router;
