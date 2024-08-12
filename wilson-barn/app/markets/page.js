import { fetchListOfMarkets } from "../lib/database/market"

export default async function markets() {


    const marketList = await fetchListOfMarkets();
    const marketListArr = [];

    marketList.forEach((market) => {
        marketListArr.push(<li key={market.id}>
            <h3>{market.name} ({market.marketStart} - {market.marketEnd})</h3>
            <a href={`markets/information/${market.id}`}><button>Market Information</button></a>
            <a href={`markets/applications/${market.id}`}><button>Vendor Applicaton</button></a>

        </li>)
    })


    return <article>
    <ul>

    {marketListArr}
    </ul>

    </article>

}