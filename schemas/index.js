import pool from "../database/index.js";
import createUsersTable from "./users.js";
import createTasksTable from "./tasks.js";

const createTables = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); 
        await createUsersTable(client);
        await createTasksTable(client);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
};

export default createTables;
