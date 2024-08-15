import { fetchMarketApplicationInfoByID, setApplicationAsApproved } from "@/app/lib/database/market";
import { sendMarketInvoice } from "@/app/lib/paypal";

export default async function applicationApproval({params}) {
    const marketInvoice = sendMarketInvoice(params.applicationID);
    let returnData = '';
    if (marketInvoice === 'invoiceExists') {
        returnData = <article>
            <h1>Invoice already exists, application set to approved</h1>
        </article>
    } else if (marketInvoice === true) {
        returnData = <article>
            <h1>The application has been approved and the Invoice has been sent</h1>
        </article>
    }
    
    if (!marketInvoice) {
        return <article>
            <h1>There was an error</h1>
            <h4>Consult with an admin for resolution</h4>
            </article>
    } 

    const applicationID = params.applicationID;
    let applicationInfo = await fetchMarketApplicationInfoByID(applicationID);
    applicationInfo = applicationInfo[0];
    const applicationApproved = await setApplicationAsApproved(applicationID);

    return <article>
        <h1>The application has been approved for {applicationInfo.business_name}</h1>
    </article>
}