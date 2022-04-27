const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db = null;
const createConnection = async () => {
    if (!db) {
        db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        })
    }
};

const syncDatabase = async () => {
    await createConnection();
    await db.exec(`CREATE TABLE IF NOT EXISTS  activity
        (id uuid primary key,
        name varchar(255) not null,
        description varchar(255),
        status boolean default false)`)
};

const connect = async () => {
    await createConnection()
    await syncDatabase();
}

const addActivity = async (activity) => {
    const {
        id,
        name,
        description,
        status = false
    } = activity;
    if (!db) {
        await connect();
    }

    await db.run(`INSERT INTO activity
    (id, name, description, status)
    VALUES(?, ?, ?, ?) RETURNING *;`,
        [
            id,
            name,
            description,
            status
        ]
    );
}

const removeActivity = async (id) => {
    if (!db) {
        await connect();
    }
    await db.run('DELETE FROM activity WHERE id = ?', [id])
}

const updateActivity = async (activity) => {
    if (!db) {
        await connect();
    }
    const {
        id, name, description, status
    } = activity;

    await db.run(`UPDATE activity
    SET name = ?, description = ?, status = ? WHERE id = ?`,
        [
            name,
            description,
            status,
            id
        ]
    );
}

const getAllActivities = async () => {
    if (!db) {
        await connect();
    }
    const result = await db.all('SELECT * FROM activity;');
    return result;
}

const getActivity = async (id) => {
    if (!db) {
        await connect();
    }
    const result = await db.get('SELECT * FROM activity WHERE id = ?', id);
    return result;
}

module.exports = {
    syncDatabase,
    addActivity,
    removeActivity,
    getActivity,
    getAllActivities,
    updateActivity
};