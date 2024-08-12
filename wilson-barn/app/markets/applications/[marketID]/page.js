import { submitVendorApplication } from "@/actions/vendorApplications";
import VendorForm from "@/app/components/vendorForm/vendor-form";
import { fetchMarketInfo } from "@/app/lib/database/market";

export default async function marketApplication({params}) {
    const marketID = params.marketID;
    const marketInfo = await fetchMarketInfo(marketID);
   
    return <VendorForm action={submitVendorApplication} marketInfo={marketInfo[0]} />

}