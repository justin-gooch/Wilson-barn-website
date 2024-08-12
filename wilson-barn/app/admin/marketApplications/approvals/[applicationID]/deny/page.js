import { fetchMarketApplicationInfoByID, setApplicationAsDenied } from "@/app/lib/database/market";

export default async function denyMarketApplication({params}){
    const applicationID = params.applicationID;
    let applicationInfo = await fetchMarketApplicationInfoByID(applicationID);
    applicationInfo = applicationInfo[0]
    const applicationDenied = setApplicationAsDenied(applicationID)

    return <article>
        <h1>The market application has been denied for {applicationInfo.business_name}</h1>
    </article>
}