'use server'
import sql from 'better-sqlite3'

const db = new sql('posts.db')

function initDb() {
    db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT
    )`);
    db.exec(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        image_url TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        eventDateTime datetime default current_timestamp,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`)

    const statement = db.prepare('SELECT COUNT(*) AS count FROM users');

    if(statement.get().count === 0) {
        db.exec(`INSERT INTO users(first_name, last_name, email) VALUES('Justin', 'Gooch', 'justinthegooch@gmail.com')`)
    }

}

initDb();

export async function getEvents(maxNumber) {
    let limitClause = '';

    if (maxNumber) {
        limitClause = 'LIMIT ?';
    }

    const statement = db.prepare(`SELECT events.id, image_url as image, title, content, eventDateTime, description, created_at as createdAt, first_name as userFirstName, last_name as userLastName FROM events INNER JOIN users on events.user_id = users.id ${limitClause}`);

    return maxNumber ? statement.all(maxNumber) : statement.all();
}

export async function getEvent(eventId) {
    const statement = db.prepare(`SELECT events.id, image_url as image, title, content, eventDateTime, description, created_at, first_name as userFirstName, last_name as userLastName FROM events INNER JOIN users on events.user_id = users.id WHERE events.id = ?`)

    return statement.all(eventId);
} 

export async function storeEvent(post) {
    const statement = db.prepare(`INSERT INTO events (image_url, title, content, description, user_id, eventDateTime) VALUES (?, ?, ?, ?, ?, ?)`)
    return statement.run(post.image_url, post.title, post.content, post.description, post.userId, post.eventDateTime)
}