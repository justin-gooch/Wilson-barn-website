import { submitRental } from "@/actions/rentals";
import RentalForm from "@/app/components/rentalForm/rental-form";

export default function RentalFormPage({params}) {
    const rentalDate = params.rentalDate
    return (
        <RentalForm action={submitRental} rentalDate={rentalDate} />
    )

}