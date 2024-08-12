import { fetchMarketApplicationInfoByID, setApplicationAsApproved } from "@/app/lib/database/market";

export default async function applicationApproval({params}) {
    const applicationID = params.applicationID;
    let applicationInfo = await fetchMarketApplicationInfoByID(applicationID);
    applicationInfo = applicationInfo[0]
    const applicationApproved = await setApplicationAsApproved(applicationID);

    //paypal payment goes here.

    return <article>
        <h1>The application has been approved for {applicationInfo.business_name}</h1>
    </article>
}