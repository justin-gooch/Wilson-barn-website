import { submitRental } from "@/actions/rentals";
import RentalForm from "@/app/components/rentalForm/rental-form";

export default function RentalFormPage({params}) {
    return (
        <RentalForm action={submitRental}/>
    )

}