import { fetchMarketApplicationInfoByID, setApplicationAsUnpaid } from "@/app/lib/database/market";

export default async function marketApplicationUnpaid({params}) {
    const applicationID = params.applicationID;

    console.log('applicationID = ', applicationID)

    let marketApplicationinfo = await fetchMarketApplicationInfoByID(applicationID);
    marketApplicationinfo = marketApplicationinfo[0]


    const marketApplicationPaid = await setApplicationAsUnpaid(applicationID);

    return <article>
        <h1>The market application has been set as unpaid for {marketApplicationinfo.business_name}</h1>
    </article>
}
