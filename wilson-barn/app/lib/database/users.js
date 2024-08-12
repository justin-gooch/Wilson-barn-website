import db from "./db";
export async function createUser(email, password, first_name, last_name) {
    const statement = db.prepare('INSERT INTO users (email, password, first_name, last_name, user_type) VALUES (?, ?, ?, ?, ?)');
    const result = statement.run(email, password, first_name, last_name, 1);
    return result.lastInsertRowid
}

export async function loginUser(email, password) {
    const statement = db.prepare('SELECT id FROM users WHERE email = ? AND password = ?')
    const result = statement.get(email, password);
    return result;
}

export async function getUserHashedPasswordAndID(email) {
    const statement = db.prepare('SELECT password, id from users where email = ?') 
    const result = statement.get(email);
    return result;
}

export async function userIsAdmin(userId) {
    const statement = db.prepare('SELECT user_type from users where id = ?')
    const result = statement.get(userId);
    if(result && result['user_type'] === 0) {
        return true;
    } else {
        return false;
    }

}