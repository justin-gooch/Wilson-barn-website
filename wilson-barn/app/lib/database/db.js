import sql from 'better-sqlite3'

const db = new sql('posts.db')

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    user_type INTEGER,
    email TEXT unique,
    password TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
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
)`);


db.exec(`CREATE TABLE IF NOT EXISTS rental (
    id INTEGER PRIMARY KEY,
    rentalDate datetime UNIQUE,
    renterID INTEGER,
    isPaid INTEGER,
    isApproved INTEGER,
    FOREIGN KEY(renterID) REFERENCES users(id) ON DELETE CASCADE
)`);

db.exec(`CREATE TABLE IF NOT EXISTS rentalInformation (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    renterID INTEGER,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    hoursRental TEXT NOT NULL,
    eventType TEXT NOT NULL,
    eventDate datetime,
    setupTimeInitial TEXT NOT NULL,
    checkoutInitial TEXT NOT NULL,
    closeTimeInitial TEXT NOT NULL,
    noAlcoholInitial INTEGER NOT NULL,
    noBaloonsInitial INTEGER NOT NULL,
    noSmokingInitial INTEGER NOT NULL,
    rentalID INTEGER NOT NULL,
    signature TEXT NOT NULL, 
    submitDate datetime,
    FOREIGN KEY(renterID) references users(id)
    FOREIGN KEY(rentalID) references rental(id) ON DELETE CASCADE
)`);

db.exec(`CREATE TABLE IF NOT EXISTS rentalInvoice (
    id INTEGER PRIMARY KEY,
    invoiceID TEXT NOT NULL,
    invoiceDate INTEGER NOT NULL,
    rentalID INTEGER NOT NULL,
    paid INTEGER NOT NULL,
    sent INTEGER NOT NULL,
    FOREIGN KEY(rentalID) references rental(id)
)`)


const statement = db.prepare('SELECT COUNT(*) AS count FROM users');

if(statement.get().count === 0) {
    db.exec(`INSERT INTO users(first_name, last_name, email, user_type) VALUES('Justin', 'Gooch', 'justinthegooch@gmail.com', 0)`)
};


function createNewRentalDates(startDate, endDate) {
    console.log('createNewRentalDates has been called')
    let tmpDate = new Date(startDate) 
    if (startDate && endDate && startDate < endDate) {
        while (tmpDate < endDate) {
            if (tmpDate.getDay() == 6 || tmpDate.getDay() == 0) {
                // const currRentalDate = new Date(rentalDate).toISOString().split('T')[0];
                const statement = db.prepare(`INSERT INTO rental (rentalDate, isPaid) VALUES(?, 0)`)
                statement.run(new Date(tmpDate.toISOString().split('T')[0]).toISOString());
            }
            tmpDate.setDate(tmpDate.getDate()+ 1)
        }
    } else {
        throw error('your start date for the range must be greater than the end date');
    }
}

const hasRentalDays =
  db.prepare('SELECT COUNT(*) as count FROM rental').get().count > 0;
if (!hasRentalDays) {
    //TODO: Figure out a way to set up rental dates non programmatically later. 
    //perhaps as part of some kind of admin console
    createNewRentalDates(new Date('may 30 2024'), new Date('september 29 2024'));
}

export default db;
