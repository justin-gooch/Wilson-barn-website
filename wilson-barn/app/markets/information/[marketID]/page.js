import { fetchMarketInfo } from "@/app/lib/database/market";

export default async function marketInformation({params}) {
    const marketID = params.marketID;
    const marketInfo = await fetchMarketInfo(marketID);

    return <article>
    <h1>{marketInfo[0].title}</h1>
    <h6>{marketInfo[0].description}</h6>
    <p><img src={marketInfo[0].flyerImage} /></p>
    <p>{marketInfo[0].details}</p>
    <p></p>
    </article>
}