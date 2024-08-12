import { fetchMarketInfo } from "@/app/lib/database/market";

export default async function successfulApplication({params}) {

    const marketID = params.marketID;

    let marketInfo = await fetchMarketInfo(marketID);
    marketInfo = marketInfo[0];

    return <>
    <h3>Your application for the {marketInfo.title} was submitted</h3>
    <h3> you should receive an invoice or additional feedback soon</h3>
    </>


}