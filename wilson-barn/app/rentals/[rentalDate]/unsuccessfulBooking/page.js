'use server'
import Calendar from "@/app/components/RentalCalendar/calendar";
import { isRentalDateAvailable, fetchAvailableRentalDates } from "@/app/lib/rentals"

export default async function unsuccessfulBooking({params}) {
    const rentalDateAvailable = await isRentalDateAvailable(params.rentalDate);
    let availableRentalDates = ''
    if(!rentalDateAvailable) {
        availableRentalDates = await fetchAvailableRentalDates();
    }
    console.log('isRentalDateAvailable?', rentalDateAvailable);
    return (
        <article>
            <h1>Unsuccessful Booking Attempt</h1>
            <p>Your request to Book a rental for {params.rentalDate} was Unsuccessful.</p>
            {!rentalDateAvailable && <>
            <p>Unfortunately that rental date has been booked, please choose a different day below </p>
            <h1>Available Rental Dates</h1>
            <Calendar availableRentals={availableRentalDates} />
            </>
            }
            {rentalDateAvailable && <p>Please try again or call (734) 427-4311</p>}
        </article>
    )
}