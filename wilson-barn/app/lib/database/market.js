import db from "./db";

export async function fetchListOfMarkets() {
    const statement = db.prepare('SELECT * FROM market order by marketEnd asc');
    return statement.all();
}


export async function fetchMarketInfo(marketID) {
    const statement = db.prepare('SELECT * FROM marketInfo where id = ?')
    return statement.all(marketID)
}

export async function storeMarketApplication(post) {


    const statement = db.prepare(`INSERT INTO marketApplication (marketID, first_name, last_name, business_name, email, street_address, street_address_line_2, city, state, zip, phone, accept_credit_debit, electricity, description_of_items_sold, how_many_spots, days_of_participation, pay_for_whole_season, agree_to_participate_pay, farmer_food_liability_license, media_release, hold_harmless, submit_date, paying_via_paypal, signature, approved, paid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)

    try {
    statement.run(
        post.marketID,
        post.first_name,
        post.last_name,
        post.business_name,
        post.email,
        post.street_address,
        post.street_address_line_2,
        post.city,
        post.state,
        post.zip,
        post.phone,
        post.accept_credit_debit,
        post.electricity,
        post.description_of_items_sold,
        post.how_many_spots,
        post.days_of_participation,
        post.pay_for_whole_season,
        post.agree_to_participate_pay,
        post.farmer_food_liability_license,
        post.media_release,
        post.hold_harmless,
        post.submit_date,
        post.paying_via_paypal,
        post.signature,
        0,
        0
    ); } catch(e) {
        console.log('error occurred', e)
        return false
    } 
    return true;

}

export async function fetchToBeApprovedMarketApplications() {
    const statement = db.prepare('SELECT * FROM marketApplication WHERE approved = 0')
    return statement.all();
}

export async function fetchToBePaidMarketApplications() {
    const statement = db.prepare('SELECT * FROM marketApplication WHERE approved = 1 and paid = 0')
    return statement.all();
}

export async function fetchDeniedMarketApplications() {

    const statement = db.prepare('SELECT * FROM marketApplication WHERE approved = 2')
    return statement.all();
}
export async function fetchApprovedAndPaidMarketApplications() {
    const statement = db.prepare('SELECT * FROM marketApplication WHERE approved = 1 and paid = 1')
    return statement.all();
}
export async function fetchMarketApplicationInfoByID(applicationID) {
    const statement = db.prepare('SELECT * FROM marketApplication where id = ?')
    return statement.all(applicationID);
}

export async function setApplicationAsApproved(applicationID) {
    const statement = db.prepare(`UPDATE marketApplication set approved = 1 WHERE id = ?`)
    statement.run(applicationID);
}

export async function setApplicationAsDenied(applicationID) {
    const statement = db.prepare(`UPDATE marketApplication set approved = 2 WHERE id = ?`)
    statement.run(applicationID);
}

export async function setApplicationAsPaid(applicationID) {
    const statement = db.prepare(`UPDATE marketApplication set paid = 1 WHERE id = ?`)
    statement.run(applicationID);
}

export async function setApplicationAsUnpaid(applicationID) {
    const statement = db.prepare(`UPDATE marketApplication set paid = 0 WHERE id = ?`)
    statement.run(applicationID);
}

export async function fetchMarketApplicationsByMarketID(marketID) {
    const statement = db.prepare('SELECT * FROM marketApplication where marketID = ?')
    return statement.all(marketID);
}

export async function saveMarketApplicationInvoice(marketApplicationID, invoiceID) {
    const statement = db.prepare(`UPDATE marketApplication set invoiceID = ? WHERE id = ?`)
    statement.run(invoiceID, marketApplicationID);
}

export async function fetchMarketApplicationByInvoiceID(invoiceID) {
    const statement = db.prepare('SELECT * FROM marketApplication where invoiceID = ?')
    return statement.all(invoiceID);
}

export async function marketApplicationHasInvoice(applicationID) {
    const statement = db.prepare('SELECT * FROM marketApplication where id = ? and invoiceID is not null')
    const results = statement.all(applicationID);
    if (results.length > 0) {
        return true;
    } 
    return false;
}


