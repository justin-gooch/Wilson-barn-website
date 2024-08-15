import { sendMarketInvoice } from "../lib/paypal"

export default function test() {
    sendMarketInvoice(3);
    return <h1>test</h1>
}