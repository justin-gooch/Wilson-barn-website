import db from "./db";

export async function createNewRentalDates(startDate, endDate) {
    let tmpDate = new Date(startDate) 
    if (startDate && endDate && startDate < endDate) {
        while (tmpDate < endDate) {
            if (tmpDate.getDay() == 6 || tmpDate.getDay() == 0) {
                // const currRentalDate = new Date(rentalDate).toISOString().split('T')[0];
                const statement = db.prepare(`INSERT INTO rentalDays (rentalDate, isPaid) VALUES(?, 0)`)
                statement.run(new Date(tmpDate.toISOString().split('T')[0]).toISOString());
            }
            tmpDate.setDate(tmpDate.getDate()+ 1)
        }
    } else {
        throw error('your start date for the range must be greater than the end date');
    }
}

export async function storeRentalInformation(post) {
    //check to see if rental already exists for that date by checking if there's a renterID attached to it. 

    // console.log('store rentalInfo called with', post)
    console.log(post.eventDate);
    const statement = db.prepare(`SELECT renterID FROM rentalDays WHERE rentalDate = ?`);
    console.log(`SELECT renterID FROM rentalDays WHERE rentalDate = ${new Date(post.eventDate).toISOString()}`)
    const result = statement.get(new Date(post.eventDate).toISOString());
    if (result && result.renterID) {
        // Rental already exists for the given date
        // Handle the case accordingly
        console.log('a rental exists for this day')
        return false;
    } else {
        const insertStatement = db.prepare(`INSERT INTO rentalInformation (name, email, renterID, address, phone, eventType, eventDate, setupTimeInitial, checkoutInitial, closeTimeInitial, noAlcoholInitial, noBaloonsInitial, noSmokingInitial, signature, submitDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const result = insertStatement.run(post.name, post.email, post.renterId, post.address, post.phone, post.eventType, new Date(post.eventDate).toISOString(), post.setupTimeInitial, post.checkoutInitial, post.closeTimeInitial, post.noAlcoholInitial, post.noBaloonsInitial, post.noSmokingInitial, post.signature, new Date(post.submitDate).toISOString());
        if (result.changes > 0) {
            const updateStatement = db.prepare(`UPDATE rentalDays SET renterID = ? WHERE rentalDate = ?`);
            updateStatement.run(post.renterId, new Date(post.eventDate).toISOString());
            return true;
        } else {
            return false;
        } 
    }
}

export async function fetchAvailableRentalDates() {
    const statement = db.prepare(`SELECT rentalDate FROM rentalDays WHERE isPaid = 0 AND renterId is null`)
    return statement.all();
}

export async function isRentalDateAvailable(rentalDate) {
    const statement = db.prepare(`SELECT renterId FROM rentalDays WHERE rentalDate = ?`)
    const result = statement.get(new Date(rentalDate).toISOString())
    console.log('isRentalDateAvailable', result, `SELECT renterId FROM rentalDays WHERE rentalDate = '${new Date(rentalDate).toISOString()}'`)
    if (result && result.renterID > 0) {
        return false;
    }
    return true;
}