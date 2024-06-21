'use server'


import { storeRentalInformation } from "@/app/lib/database";
import { redirect } from "next/navigation";

export async function submitRental(prevState, formData) {


    const name = formData.get('name');
    const email = formData.get('email');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const eventType = formData.get('eventType');
    const eventDate = formData.get('eventDate');
    const setupTimeInitial = formData.get('setupTimeInitial');
    const checkoutInitial = formData.get('checkoutInitial');
    const closeTimeInitial = formData.get('closeTimeInitial');
    const noAlcoholInitial = formData.get('noAlcoholInitial');
    const noBaloonsInitial = formData.get('noBaloonsInitial');
    const noSmokingInitial = formData.get('noSmokingInitial');
    const signature = formData.get('signature');
    const submitDate = formData.get('submitDate');
    
    // Check if any of the values are empty
    const emptyFields = [];
    if (!email) emptyFields.push('email');
    if (!name) emptyFields.push('name');
    if (!address) emptyFields.push('address');
    if (!phone) emptyFields.push('phone');
    if (!eventType) emptyFields.push('eventType');
    if (!eventDate) emptyFields.push('eventDate');
    if (!setupTimeInitial) emptyFields.push('setupTimeInitial');
    if (!checkoutInitial) emptyFields.push('checkoutInitial');
    if (!closeTimeInitial) emptyFields.push('closeTimeInitial');
    if (!noAlcoholInitial) emptyFields.push('noAlcoholInitial');
    if (!noBaloonsInitial) emptyFields.push('noBaloonsInitial');
    if (!noSmokingInitial) emptyFields.push('noSmokingInitial');
    if (!signature) emptyFields.push('signature');
    if (!submitDate) emptyFields.push('submitDate')
    // Check if email is a valid email address
   

    if (emptyFields.length > 0) {
        const errorMessage = `The field${emptyFields.length > 1 ? 's' : ''} '${emptyFields.join(', ')}' ${emptyFields.length > 1 ? 'are' : 'is'} required`;
        console.log(errorMessage);

        return(errorMessage);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const errorMessage = 'Invalid email address';
        console.log(errorMessage);
        return errorMessage;
    }

    const storeRentalQuery = await storeRentalInformation(
    {
        name,
        renterId: 1,
        email,
        address,
        phone,
        eventType,
        eventDate,
        setupTimeInitial,
        checkoutInitial,
        closeTimeInitial,
        noAlcoholInitial,
        noBaloonsInitial,
        noSmokingInitial,
        signature,
        submitDate
    })

    console.log('storeRentalQuery', storeRentalQuery, eventDate);


    if(storeRentalQuery) {
        redirect(`/rentals/${eventDate}/booked`)
    } else {
        redirect(`/rentals/${eventDate}/unsuccessfulBooking`)
    }

}