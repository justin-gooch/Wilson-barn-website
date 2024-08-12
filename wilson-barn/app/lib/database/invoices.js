import db from "./db";

export async function createNewInvoice(invoiceDate, rentalID, invoiceID) {
    const statement = db.prepare(`INSERT INTO rentalInvoice (invoiceDate, rentalID, invoiceID, paid, sent) VALUES(?, ?, ?, 0, 0)`)
    const response = statement.run(new Date(invoiceDate).getTime(), Number(rentalID), invoiceID);
    return response.lastInsertRowid
}

export async function getInvoiceByDate(invoiceDate) {
    const statement = db.prepare(`SELECT * FROM rentalInvoice WHERE invoiceDate = ?`)
    const response = statement.get(new Date(invoiceDate).getTime());
    return response;
}