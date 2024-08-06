import db from "./db";

export async function getEvents(maxNumber, showPastEvents=false) {
    let limitClause = '';
    let pastEventsClause = '';

    if (maxNumber) {
        limitClause = 'LIMIT ?';
    }


    if (!showPastEvents) {
        pastEventsClause = 'WHERE eventDateTime >= date(\'now\')';
    }

    const statement = db.prepare(`SELECT events.id, image_url as image, title, content, eventDateTime, description, created_at as createdAt, first_name as userFirstName, last_name as userLastName FROM events INNER JOIN users on events.user_id = users.id ${pastEventsClause} ORDER BY eventDateTime asc ${limitClause}`);

    return maxNumber ? statement.all(maxNumber) : statement.all();
}

export async function getEvent(eventId) {
    const statement = db.prepare(`SELECT events.id, image_url as image, title, content, eventDateTime, description, created_at, first_name as userFirstName, last_name as userLastName FROM events INNER JOIN users on events.user_id = users.id WHERE events.id = ?`)

    return statement.all(eventId);
} 

export async function getEventsList(maxNumber) {
    let limitClause = '';

    if (maxNumber) {
        limitClause = 'LIMIT ?';
    }

    const statement = db.prepare(`SELECT id, title FROM events ${limitClause}`)
    return maxNumber ? statement.all(maxNumber) : statement.all();
}

export async function storeEvent(post) {
    const statement = db.prepare(`INSERT INTO events (image_url, title, content, description, user_id, eventDateTime) VALUES (?, ?, ?, ?, ?, ?)`)
    return statement.run(post.image_url, post.title, post.content, post.description, post.userId, post.eventDateTime)
}
