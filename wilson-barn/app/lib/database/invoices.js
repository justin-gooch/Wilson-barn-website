import db from "./db";

export async function createNewInvoice(invoiceDate, rentalID, invoiceID) {
    const statement = db.prepare(`INSERT INTO rentalInvoice (invoiceDate, rentalID, invoiceID, paid, sent) VALUES(?, ?, ?, 0, 0)`)
    const response = statement.run(new Date(invoiceDate).getTime(), Number(rentalID), invoiceID);
    console.log('createNewInvoice response', response, response.lastInsertRowid, new Date(invoiceDate).getTime());
    return response.lastInsertRowid
}

export async function getInvoiceByDate(invoiceDate) {
    const statement = db.prepare(`SELECT * FROM rentalInvoice WHERE invoiceDate = ?`)
    console.log(`SELECT * FROM rentalInvoice WHERE invoiceDate = ${new Date(invoiceDate).getTime()}`)
    const response = statement.get(new Date(invoiceDate).getTime());
    console.log('invoiceDate', response, invoiceDate.split('T')[0]);
    return response;
}