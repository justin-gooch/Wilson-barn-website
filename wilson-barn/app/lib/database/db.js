import sql from 'better-sqlite3'

const db = new sql('wilsonBarn.db')

//user tables
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_type INTEGER NOT NULL,
    email TEXT unique NOT NULL,
    password TEXT NOT NULL,
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
)`);


//events
db.exec(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    eventDateTime datetime default current_timestamp,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
)`);

//rentals
db.exec(`CREATE TABLE IF NOT EXISTS rental (
    id INTEGER PRIMARY KEY,
    rentalDate datetime UNIQUE,
    renterID INTEGER,
    isPaid INTEGER,
    isApproved INTEGER,
    FOREIGN KEY(renterID) REFERENCES users(id) ON DELETE CASCADE,
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
    FOREIGN KEY(renterID) references users(id),
    FOREIGN KEY(rentalID) references rental(id) ON DELETE CASCADE,
)`);

db.exec(`CREATE TABLE IF NOT EXISTS rentalInvoice (
    id INTEGER PRIMARY KEY,
    invoiceID TEXT NOT NULL,
    invoiceDate INTEGER NOT NULL,
    rentalID INTEGER NOT NULL,
    paid INTEGER NOT NULL,
    sent INTEGER NOT NULL,
    FOREIGN KEY(rentalID) references rental(id) ON DELETE CASCADE,
)`);

//markets
db.exec(`CREATE TABLE IF NOT EXISTS market (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    marketStart datetime, 
    marketEnd datetime, 
)`);

db.exec(`CREATE TABLE IF NOT EXISTS marketInfo (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL, 
    marketID INTEGER NOT NULL,
    description TEXT NOT NULL,
    details TEXT NOT NULL,
    flyerImage TEXT NOT NULL,
    listOfDaysForMarket TEXT NOT NULL,
    moreThanOneDay INTEGER NOT NULL,
    costPerSpotPerDay INTEGER NOT NULL,
    costPerSpotPerSeason INTEGER NOT NULL,
    participateText TEXT NOT NULL,
    foodFarmLicenseText TEXT NOT NULL,
    mediaReleaseText TEXT NOT NULL,
    holdHarmlessText TEXT NOT NULL,
    paymentAgreementText TEXT NOT NULL,
    FOREIGN KEY(marketID) references market(id),
)`);

db.exec(`CREATE TABLE IF NOT EXISTS marketApplication (
    id INTEGER PRIMARY KEY,
    marketID INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    email TEXT NOT NULL,
    street_address TEXT NOT NULL,
    street_address_line_2 TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip INTEGER NOT NULL,
    phone TEXT NOT NULL,
    accept_credit_debit INTEGER NOT NULL,
    electricity INTEGER NOT NULL,
    description_of_items_sold TEXT NOT NULL,
    how_many_spots INTEGER NOT NULL,
    days_of_participation TEXT NOT NULL,
    pay_for_whole_season INTEGER NOT NULL,
    agree_to_participate_pay INTEGER NOT NULL,
    farmer_food_liability_license INTEGER NOT NULL,
    media_release INTEGER NOT NULL,
    hold_harmless INTEGER NOT NULL,
    paying_via_paypal INTEGER NOT NULL,
    signature TEXT NOT NULL,
    FOREIGN KEY(marketID) references market(id),
)`);


const statement = db.prepare('SELECT COUNT(*) AS count FROM users');

if(statement.get().count === 0) {
    db.exec(`INSERT INTO users(first_name, last_name, email, user_type) VALUES('Justin', 'Gooch', 'justinthegooch@gmail.com', 0)`)
};

const marketStatement = db.prepare('SELECT COUNT(*) AS count from market');

if(marketStatement.get().count === 0) {
    const stmnt = db.prepare(`INSERT INTO MARKET (name, marketStart, marketEnd) VALUES (?,?,?)`);
    stmnt.run('Farmers Market', new Date('07/06/2024').toISOString(), new Date('09/28/2024').toISOString())
    const stmnt2 = db.prepare(`INSERT INTO marketInfo (title, marketID, description, details, flyerImage, listOfDaysForMarket, moreThanOneDay, costPerSpotPerDay, costPerSpotPerSeason, 
        participateText, foodFarmLicenseText, mediaReleaseText, holdHarmlessText, paymentAgreementText) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    )`)
    stmnt2.run('Farmers Market', 1, 'Wilson barn Summer farmers market', 'Come on down to the wilson barn for our farmers market', 'n/a',
    'july 6th, july 13th, july 20th, july 27th, august 3rd, august 10th, august 17th, august 24th, august 31st, september 7th, september 14th, september 21st, september 28th',
    1, 10, 100, 
    'I agree to participate in the Livonia`s Summer Farmers Market and to pay the Craft Show rate for the 2024 season. I have read the rules and regulations; I agree to and understand the terms and conditions under which I will or will not be allowed to participate. Farmers/Food Vendors that have documentation listed below, please have them with you at the market and also provide the Friends of the Barn with a copy',
    'If you are a farmer or food vendor you agree to provide the followingFarmers/Food Vendors ❖ A copy of your general and product liability insurance if required by the State of Michigan. ❖ State of Michigan licenses (if applicable). Copy of Organic certification (if applicable). ❖ Copies of the above documents, if they apply, must be available for review should the state inspector visit our market. Please provide a copy to the Friends of the Barn.', 
    'Media Release: Adult consent to photograph/videotape & disseminate without compensationI agree to herby give my consent to be photographed/videotaped while participating inany activity at The Wilson Barn. In addition, I consent to the reproduction and use of any such photographs andvideotapes by the City for educational, public relations and promotional purposes and I waive any claim by myself,or anyone claiming under or through me, for compensation of any kind in exchange for such photographs, videotapesand use.', 
    'RELEASE AND HOLD HARMLESS AGREEMENT:In consideration of entering into this agreement with the city of Livonia and the Friends of the Barn, the undersigned, by this instrument, do hereby expressly stipulate and agree to release, discharge, indemnify, and forever hold harmless the City of Livonia and the Friends of the Barn, its assigns, agents, servants and employees of and from all claims, demands, actions, or causes of action now existing or which may hereafter exit by reason of any damage, loss, loss of income or profit, or injury which heretofore has been or which may hereafter be sustained by the said individual, group, organization or family as a consequences of their participation in any and all activities in connection with this agreement.This release extends and applies to, and also covers and includes, all unknown, unforeseen, unanticipated and unsuspected injuries, damages, loss, loss of income or profit and liability and the consequence thereof, as wellas those now disclosed and known to exist. The provisions of any state, federal, local or territorial law or statue providing in substance that releases shall not extend to claims, demands, injuries, or damages which are unknown or are unsuspected to exist at the time to the person executing such release, are hereby expressly waived.Vendor/Sub-Vendor/Independent Contractor Signature Accepting the Above Release and Hold HarmlessStatement',
    'I understand that I will be paying via Paypal and will receive an invoice from wilsonbarn.us@gmail.com')
}


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
