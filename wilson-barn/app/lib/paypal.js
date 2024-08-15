import { createNewInvoice, getInvoiceByDate } from "./database/invoices";
import { fetchMarketApplicationInfoByID, fetchMarketInfo, marketApplicationHasInvoice, saveMarketApplicationInvoice } from "./database/market";
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



export async function createAndSendInvoice(items, customerInfo) {
    const todaysDate = new Date().toISOString().split('T')[0];
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
                            "full_name": customerInfo.name
                        },
                        "address": {
                            "address_line_1": customerInfo.address,
                        },
                        "email_address": customerInfo.email,
                        "phones": [
                            {
                                "country_code": "001",
                                "national_number": customerInfo.phone,
                                "phone_type": "HOME"
                            }
                        ],
                    },
                }
            ],
            "items": items.map(item => ({
                "name": item.name,
                "description": item.description,
                "quantity": item.quantity,
                "unit_amount": {
                    "currency_code": "USD",
                    "value": item.unit_amount
                },
                "unit_of_measure": "QUANTITY"
            })),
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
         console.log('invoice available for view at ', `https://www.sandbox.paypal.com/invoice/p/#${invoiceID}`)
         return invoiceID;
    }
    else {
        throw new error('there was an error processing your request')
        return false;
    }
    return false;
}

export async function sendRentalInvoice(rentalID) {
    let rentalInfo = await fetchRentalInfo(rentalID);
    rentalInfo = rentalInfo[0];
    const todaysDate = new Date().toISOString().split('T')[0];
    const invoiceExists = await getInvoiceByDate(rentalInfo.eventDate)
    if (invoiceExists !== undefined) {
        return false;
    }

    const customerInfo = {
        name: rentalInfo.name,
        address: rentalInfo.address,
        email: rentalInfo.email,
        phone: rentalInfo.phone
    }
    const additionalHours = rentalInfo.hoursRental;
    const items = [
        {
            name: "Barn Rental (6 hours)",
            description: "6 Hours of rental.",
            quantity: 1,
            unit_amount: "225.00"
        },
        {
            name: "additional hours",
            description: "additional Rental hours",
            quantity: additionalHours,
            unit_amount: "25.00"
        }
    ]
    const invoiceID = await createAndSendInvoice(items, customerInfo);
    if (invoiceID) {
        await setRentalAsApproved(rentalID);
        return true;
    } else {
        return false;
    }
}

export async function sendMarketInvoice(marketApplicationID) {
    const hasInvoice = await marketApplicationHasInvoice(marketApplicationID);
    if (hasInvoice) {
        return "invoiceExists";
    }
    let marketApplicationInfo = await fetchMarketApplicationInfoByID(marketApplicationID);
    marketApplicationInfo = marketApplicationInfo[0];
    let marketInfo = await fetchMarketInfo(marketApplicationInfo.marketID);
    marketInfo = marketInfo[0];


    const daysOfParticiptationArr = marketApplicationInfo.days_of_participation.split(',');
    const daysOfParticipation = daysOfParticiptationArr.length;

    const pay_for_whole_season = marketApplicationInfo.pay_for_whole_season;
    const number_of_spots = marketApplicationInfo.how_many_spots;
    const costPerSpotPerDay = marketInfo.costPerSpotPerDay;
    const costPerSpotPerSeason = marketInfo.costPerSpotPerSeason;

    let name = `${marketInfo.title} spot${number_of_spots > 1 ? 's' : ''} for ${marketApplicationInfo.business_name}`;
    let description = `Renting ${number_of_spots} ${number_of_spots > 1 ? 'spots' : 'spot'} at ${marketInfo.title} ${pay_for_whole_season ? 'for the whole season' : `for ${daysOfParticipation} days`} at $${marketInfo.costPerSpotPerDay} per spot per day for a total of $${costPerSpotPerDay * daysOfParticipation * number_of_spots}`;

    const items = [
        {
            name: name,
            description: description,
            quantity: pay_for_whole_season ? number_of_spots : daysOfParticipation * number_of_spots,
            unit_amount: pay_for_whole_season ? costPerSpotPerSeason : costPerSpotPerDay
        }
    ]
    const customerInfo = {
        name: marketApplicationInfo.business_name,
        address: `${marketApplicationInfo.street_address} ${marketApplicationInfo.street_address_line_2 ? marketApplicationInfo.street_address_line_2 : ''} ${marketApplicationInfo.city}, ${marketApplicationInfo.state} ${marketApplicationInfo.zip}`,
        email: marketApplicationInfo.email,
        phone: marketApplicationInfo.phone
    }
    const invoiceID = await createAndSendInvoice(items, customerInfo);
    if (invoiceID) {
        await saveMarketApplicationInvoice(marketApplicationID, invoiceID);
        return true;
    } else {
        return false;
    }
}
// export async function createAndSendInvoice(rentalID) {

//     let rentalInfo = await fetchRentalInfo(rentalID);
//     rentalInfo = rentalInfo[0]
//     const todaysDate = new Date().toISOString().split('T')[0];
//     const invoiceExists = await getInvoiceByDate(rentalInfo.eventDate)

//     //if an invoice exists already, return false.
//     if (invoiceExists !== undefined) {
//         return false;
//     }
//     console.log('invoiceExists', invoiceExists === undefined)
//     // const invoice = createNewInvoice(todaysDate, rentalInfo[0].rentalInfoID);
//     //check to see if an invoice already exists for this date. 


//     const bearerToken = await getPaypalBearerToken();
//     if (bearerToken) {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         myHeaders.append("Authorization", "bearer " + bearerToken)
//         myHeaders.append("Prefer", "return=representation")

//         const body = {
//             "detail": {
//                 "invoice_date": todaysDate,
//                 "currency_code": "USD",
//             },
//             "invoicer": {
//                 "name": {
//                     "given_name": "Wilson",
//                     "surname": "Barn"
//                 },
//                 "address": {
//                     "address_line_1": "29350 West Chicago",
//                     "admin_area_2": "Livonia",
//                     "admin_area_1": "MI",
//                     "postal_code": "48150",
//                     "country_code": "US"
//                 },
//                 "email_address": "sb-pl2uw31959435@business.example.com",
//                 "website": "wilsonbarn.org",
//             },
//             "primary_recipients": [
//                 {
//                     "billing_info": {
//                         "name": {
//                             "full_name": rentalInfo.name
//                         },
//                         "address": {
//                             "address_line_1": rentalInfo.address,
//                         },
//                         "email_address": rentalInfo.email,
//                         "phones": [
//                             {
//                                 "country_code": "001",
//                                 "national_number": rentalInfo.phone,
//                                 "phone_type": "HOME"
//                             }
//                         ],
//                     },
//                 }
//             ],
//             "items": [
//                 {
//                     "name": "Barn Rental (6 hours)",
//                     "description": "6 Hours of rental.",
//                     "quantity": "1",
//                     "unit_amount": {
//                         "currency_code": "USD",
//                         "value": "225.00"
//                     },
//                     "unit_of_measure": "QUANTITY"
//                 },
//                 {
//                     "name": "additional hours",
//                     "description": "additional Rental hours",
//                     "quantity": rentalInfo.hoursRental,
//                     "unit_amount": {
//                         "currency_code": "USD",
//                         "value": "25.00"
//                     },
//                     "unit_of_measure": "QUANTITY"
//                 }
//             ],
//             "configuration": {
//                 "tax_calculated_after_discount": "false"
//             },
//         }

//         const invoiceUrl = 'https://api-m.sandbox.paypal.com/v2/invoicing/invoices'
//         let draftInvoiceResults = '';

//         await fetch(invoiceUrl, {
//             method: 'POST',
//             headers: myHeaders,
//             body: JSON.stringify(body)
//         })
//         .then((response) => response.text())
//         .then((result) => draftInvoiceResults = result)
//         .catch((error) =>  { 
//             console.error(error);
//             return false;

//          });

//         const draftInvoiceResultsJSON = JSON.parse(draftInvoiceResults);
//         const invoiceID = draftInvoiceResultsJSON.id;
//         const sendInvoiceURL = `https://api-m.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}/send`

//         const invoice = await createNewInvoice(rentalInfo.eventDate, rentalInfo.rentalInfoID, invoiceID);
//         let sendInvoiceResult = '';

//         await fetch(sendInvoiceURL, {
//             method: 'POST',
//             headers: myHeaders,
//             body: JSON.stringify({"send_to_invoicer": true})
//         })
//         .then((response) => response.text())
//         .then((result) => sendInvoiceResult = result)
//         .catch((error) => { 
//             console.error(error);
//             return false;

//          });

//         await setRentalAsApproved(rentalID);

//          return true;
//     }
//     else {
//         throw new error('there was an error processing your request')
//         return false;
//     }
// }