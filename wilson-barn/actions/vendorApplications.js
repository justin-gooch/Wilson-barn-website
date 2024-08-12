'use server'

import { storeMarketApplication } from "@/app/lib/database/market";
import { redirect } from "next/navigation";

export async function submitVendorApplication(prevState, formData) {

    let errors = []

    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const business_name = formData.get('business_name')
    const email = formData.get('email')
    const street_address = formData.get('street_address')
    const street_address_line_2 = formData.get('street_address_line_2')
    const city = formData.get('city');
    const state = formData.get('state')
    const zip = formData.get('zip');
    const phone = formData.get('phone')
    const accept_credit_debit = formData.get('accept_credit_debit')
    const electricity = formData.get('electricity')
    const description_of_items_sold = formData.get('description_of_items_sold')
    const how_many_spots = formData.get('how_many_spots')
    const days_of_participation = formData.getAll('days_of_participation').join(',')
    const pay_for_whole_season = formData.get('pay_for_whole_season')
    const agree_to_participate_pay = formData.get('agree_to_participate_pay')
    const farmer_food_liability_license = formData.get('farmer_food_liability_license')
    const media_release = formData.get('media_release')
    const hold_harmless = formData.get('hold_harmless')
    const paying_via_paypal = formData.get('paying_via_paypal')
    const signature = formData.get('signature')
    const marketID = formData.get('marketID')
    const submit_date = formData.get('submit_date')


    const emptyFields = [];
    if (!first_name) emptyFields.push('first_name');
    if (!last_name) emptyFields.push('last_name');
    if (!business_name) emptyFields.push('business_name');
    if (!email) emptyFields.push('email');
    if (!street_address) emptyFields.push('street_address');
    if (!city) emptyFields.push('city');
    if (!state) emptyFields.push('state');
    if (!zip) emptyFields.push('zip');
    if (!phone) emptyFields.push('phone');
    if (!accept_credit_debit) emptyFields.push('accept_credit_debit');
    if (!electricity) emptyFields.push('electricity');
    if (!description_of_items_sold) emptyFields.push('description_of_items_sold');
    if (!how_many_spots) emptyFields.push('how_many_spots');
    if (!days_of_participation) emptyFields.push('days_of_participation');
    if (!pay_for_whole_season) emptyFields.push('pay_for_whole_season');
    if (!agree_to_participate_pay) emptyFields.push('agree_to_participate_pay');
    if (!farmer_food_liability_license) emptyFields.push('farmer_food_liability_license');
    if (!media_release) emptyFields.push('media_release');
    if (!hold_harmless) emptyFields.push('hold_harmless');
    if (!paying_via_paypal) emptyFields.push('paying_via_paypal');
    if (!signature) emptyFields.push('signature');
    if (!marketID) emptyFields.push('marketID');
    if (!submit_date) emptyFields.push('submit_date');

    if (emptyFields.length > 0) {
        const errorMessage = `The field${emptyFields.length > 1 ? 's' : ''} '${emptyFields.join(', ')}' ${emptyFields.length > 1 ? 'are' : 'is'} required`;
        errors.push(errorMessage)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const errorMessage = 'Invalid email address';
       errors.push(errorMessage);
    }

    if(errors.length > 0) {
        return {errors};
    }

    const storeMarket = await storeMarketApplication({
        first_name,
        last_name,
        business_name,
        email,
        street_address,
        street_address_line_2,
        city,
        state,
        zip,
        phone,
        accept_credit_debit,
        electricity,
        description_of_items_sold,
        how_many_spots,
        days_of_participation,
        pay_for_whole_season,
        agree_to_participate_pay,
        farmer_food_liability_license,
        media_release,
        hold_harmless,
        paying_via_paypal,
        signature,
        marketID,
        submit_date
    });

    if(storeMarket) {
        redirect(`/markets/applications/${marketID}/submitted/success`)
    } else {
        redirect(`/markets/applications/${marketID}/submitted/fail`)

    }

};