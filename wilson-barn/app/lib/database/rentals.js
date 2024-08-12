import db from "./db";

export async function createNewRentalDates(startDate, endDate) {
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

export async function storeRentalInformation(post) {
    const statement = db.prepare(`SELECT id, renterID FROM rental WHERE rentalDate = ?`);
    const result = statement.get(new Date(post.eventDate).toISOString());
    const rentalDateID = result.id;
    if (result && result.renterID) {
        // Rental already exists for the given date
        // Handle the case accordingly
        return false;
    } else {
        const insertStatement = db.prepare(`INSERT INTO rentalInformation (name, email, renterID, address, phone, hoursRental, eventType, eventDate, setupTimeInitial, checkoutInitial, closeTimeInitial, noAlcoholInitial, noBaloonsInitial, noSmokingInitial, signature, submitDate, rentalID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const result = insertStatement.run(post.name, post.email, post.renterId, post.address, post.phone, post.hoursRental, post.eventType, new Date(post.eventDate).toISOString(), post.setupTimeInitial, post.checkoutInitial, post.closeTimeInitial, post.noAlcoholInitial, post.noBaloonsInitial, post.noSmokingInitial, post.signature, new Date(post.submitDate).toISOString(), rentalDateID);
        if (result.changes > 0) {
            const updateStatement = db.prepare(`UPDATE rental SET renterID = ?, isApproved = ? WHERE rentalDate = ?`);
            updateStatement.run(post.renterId, 0, new Date(post.eventDate).toISOString());
            return true;
        } else {
            return false;
        } 
    }
}

export async function fetchAvailableRentalDates() {
    const statement = db.prepare(`SELECT rentalDate FROM rental WHERE isPaid = 0 AND renterId is null`)
    return statement.all();
}

export async function fetchRentalInfo(rentalID) {
    const statement = db.prepare(`SELECT rentalInformation.id as rentalInfoID, * FROM rentalInformation INNER JOIN rental ON rental.id = rentalInformation.rentalID WHERE rental.id = ?`)
    return statement.all(rentalID);
}

export async function fetchRentalIDFromRentalDateID(rentalDateID) {
    const statement = db.prepare(`SELECT rentalInformation.id from rentalInformation INNER JOIN rental ON rental.id = rentalInformation.rentalID WHERE rental.id = ?`)
    return statement.all(rentalDateID);
}

export async function fetchToBeApprovedRentalDates() {
    const statement = db.prepare(`SELECT id, rentalDate FROM rental WHERE isPaid = 0 AND renterId IS not null AND isApproved = 0`);
    return statement.all();
}

export async function fetchToBePaidRentalDates() {
    const statement = db.prepare(`SELECT id, rentalDate from rental WHERE isPaid = 0 AND isApproved = 1 AND renterId is not null`);
    return statement.all();
}

export async function fetchDeniedRentalDates() {
    const statement = db.prepare(`SELECT id, rentalDate FROM rental WHERE isApproved = 2 and renterID is not null`);
    return statement.all();
}

export async function deleteRental(rentalID) {
    const statement = db.prepare('UPDATE rental SET isApproved = 0, renterID = null, isPaid = 0 WHERE id = ?')
    statement.run(rentalID);
}

export async function setRentalAsApproved(rentalID) {
    const statement = db.prepare('UPDATE rental SET isApproved = 1  WHERE id = ?')
    statement.run(rentalID);
}

export async function setRentalAsDenied(rentalID) {
    const statement = db.prepare('UPDATE rental SET isApproved = 2 WHERE id = ?')
    statement.run(rentalID);
}

export async function setRentalAsPaid(rentalID) {
    const statement = db.prepare('update rental set isPaid = 1 WHERE id = ?')
    statement.run(rentalID)
}

export async function isRentalDateAvailable(rentalDate) {
    const statement = db.prepare(`SELECT renterId FROM rental WHERE rentalDate = ?`)
    const result = statement.get(new Date(rentalDate).toISOString())
    if (result && result.renterID > 0) {
        return false;
    }
    return true;
}