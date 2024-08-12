import { fetchMarketApplicationInfoByID, setApplicationAsPaid } from "@/app/lib/database/market";

export default async function marketApplicationPaid({params}) {
    const applicationID = params.applicationID;

    console.log('applicationID = ', applicationID)

    let marketApplicationinfo = await fetchMarketApplicationInfoByID(applicationID);
    marketApplicationinfo = marketApplicationinfo[0]

    console.log('appkication info', marketApplicationinfo);

    const marketApplicationPaid = await setApplicationAsPaid(applicationID);

    return <article>
        <h1>The market application has been set as paid for {marketApplicationinfo.business_name}</h1>
    </article>
}
