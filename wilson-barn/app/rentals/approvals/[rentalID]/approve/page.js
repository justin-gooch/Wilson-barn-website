import { isAdminAuth } from "@/app/lib/auth";
import { createAndSendInvoice } from "@/app/lib/paypal";

export default async function approve({params}) {
    const adminAuthed = await isAdminAuth();


    const rentalID = params.rentalID;

    if(adminAuthed) {
        const paypalInvoice = await createAndSendInvoice(rentalID);
        if (paypalInvoice) {
            return <>
                <h1>Invoice Successfully Sent</h1>
                <p>once paid, please confirm via the rental page</p>
            </>
        } else {
            return <>
                <h1>There was an error</h1>
                <p>Please consult with the administrator to resolve</p>
                </>
        }

    }


}