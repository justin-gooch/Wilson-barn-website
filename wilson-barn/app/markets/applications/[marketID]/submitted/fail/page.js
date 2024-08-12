import { fetchMarketInfo } from "@/app/lib/database/market";

export default async function failedApplication({params}) {

    const marketID = params.marketID;

    let marketInfo = await fetchMarketInfo(marketID);
    marketInfo = marketInfo[0];

    return <>
    <h3>Your application for the {marketInfo.title} was unsuccessful</h3>
    <h3> please email us at wilsonbarn.us@gmail.com for additional help</h3>
    </>


}