import { createNewInvoice, getInvoiceByDate } from "./database/invoices";
import { fetchRentalInfo, setRentalAsApproved } from "./database/rentals";
import base64 from 'base-64'
// import paypal from '@paypal/checkout-server-sdk'

export async function getPaypalBearerToken() {

    if(!process.env.CURRENT_ENVIRONMENT) {
        throw new error('NO CURRENT_ENVIRONMENT SET')
    }

    if (process.env.CURRENT_ENVIRONMENT === 'dev') {
        if(!process.env.DEV_PAYPAL_CLIENT_ID || !process.env.DEV_PAYPAL_CLIENT_SECRET_KEY) {
            throw new error('DEV_PAYPAL_CLIENT_ID OR DEV_PAYPAL_CLIENT_SECRET_KEY NOT SET')
        } 

        const clientID = process.env.DEV_PAYPAL_CLIENT_ID
        const clientSecret = process.env.DEV_PAYPAL_CLIENT_SECRET_KEY;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Basic " + base64.encode(clientID + ":" + clientSecret));

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
        };
        let results = '';

        await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            results = result
             })
        .catch((error) => console.error(error));



        try {
            const result = JSON.parse(results);
            const bearerToken = result.access_token;
            if(bearerToken) {
                return bearerToken;
            }
        } catch(e) {
            throw new error('No Bearer token')
        }
        return false;
    }

}

export async function createAndSendInvoice(rentalID) {

    let rentalInfo = await fetchRentalInfo(rentalID);
    rentalInfo = rentalInfo[0]
    const todaysDate = new Date().toISOString().split('T')[0];
    const invoiceExists = await getInvoiceByDate(rentalInfo.eventDate)

    //if an invoice exists already, return false.
    if (invoiceExists !== undefined) {
        return false;
    }
    console.log('invoiceExists', invoiceExists === undefined)
    // const invoice = createNewInvoice(todaysDate, rentalInfo[0].rentalInfoID);
    //check to see if an invoice already exists for this date. 


    const bearerToken = await getPaypalBearerToken();
    if (bearerToken) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "bearer " + bearerToken)
        myHeaders.append("Prefer", "return=representation")

        const body = {
            "detail": {
                "invoice_date": todaysDate,
                "currency_code": "USD",
            },
            "invoicer": {
                "name": {
                    "given_name": "Wilson",
                    "surname": "Barn"
                },
                "address": {
                    "address_line_1": "29350 West Chicago",
                    "admin_area_2": "Livonia",
                    "admin_area_1": "MI",
                    "postal_code": "48150",
                    "country_code": "US"
                },
                "email_address": "sb-pl2uw31959435@business.example.com",
                "website": "wilsonbarn.org",
            },
            "primary_recipients": [
                {
                    "billing_info": {
                        "name": {
                            "full_name": rentalInfo.name
                        },
                        "address": {
                            "address_line_1": rentalInfo.address,
                        },
                        "email_address": rentalInfo.email,
                        "phones": [
                            {
                                "country_code": "001",
                                "national_number": rentalInfo.phone,
                                "phone_type": "HOME"
                            }
                        ],
                    },
                }
            ],
            "items": [
                {
                    "name": "Barn Rental (6 hours)",
                    "description": "6 Hours of rental.",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "225.00"
                    },
                    "unit_of_measure": "QUANTITY"
                },
                {
                    "name": "additional hours",
                    "description": "additional Rental hours",
                    "quantity": rentalInfo.hoursRental,
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "25.00"
                    },
                    "unit_of_measure": "QUANTITY"
                }
            ],
            "configuration": {
                "tax_calculated_after_discount": "false"
            },
        }

        const invoiceUrl = 'https://api-m.sandbox.paypal.com/v2/invoicing/invoices'
        let draftInvoiceResults = '';

        await fetch(invoiceUrl, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(body)
        })
        .then((response) => response.text())
        .then((result) => draftInvoiceResults = result)
        .catch((error) =>  { 
            console.error(error);
            return false;

         });

        const draftInvoiceResultsJSON = JSON.parse(draftInvoiceResults);
        const invoiceID = draftInvoiceResultsJSON.id;
        const sendInvoiceURL = `https://api-m.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}/send`

        const invoice = await createNewInvoice(rentalInfo.eventDate, rentalInfo.rentalInfoID, invoiceID);
        let sendInvoiceResult = '';

        await fetch(sendInvoiceURL, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({"send_to_invoicer": true})
        })
        .then((response) => response.text())
        .then((result) => sendInvoiceResult = result)
        .catch((error) => { 
            console.error(error);
            return false;

         });

        await setRentalAsApproved(rentalID);

         return true;
    }
    else {
        throw new error('there was an error processing your request')
        return false;
    }
}