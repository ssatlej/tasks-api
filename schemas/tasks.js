import pool from "./index.js";

const createTasksTable = async (client) => {
    const createTasksTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            due_date DATE,
            image_url TEXT,
            status INT,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        );
    `;

    try {
        await client.query(createTasksTableQuery);
    } catch (error) {
        console.error('Error creating tasks table:', error);
    }
};

export default createTasksTable;
