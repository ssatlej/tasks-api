import pool from "./index.js";

const createUsersTable = async (client) => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            status INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await client.query(createUsersTableQuery);
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

export default createUsersTable;
