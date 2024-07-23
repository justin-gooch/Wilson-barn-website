import pdfDocument from 'pdfkit'
import fs from 'fs'


export default function createRentalPDF(rentalDate) {
    console.log('rental date = ', rentalDate)
    //check to see if we have any rentals for this date. 
    const doc = new pdfDocument();
    doc.font(path.join(__dirname, 'node_modules/pdfkit/js/data/Helvetica.afm'));

    // doc.pipe(fs.createWriteStream(rentalDate))
    // doc.end();

}