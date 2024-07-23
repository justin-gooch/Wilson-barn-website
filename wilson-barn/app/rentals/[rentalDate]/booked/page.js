export default function rentalBooked({params}) {
    // createRentalPDF(params.rentalDate);
    return (
        <article>
            <h1>Your Rental on {params.rentalDate} has been successfully booked</h1>
            <p>You will receive an email shortly for payment information</p>

        </article>
    )
}