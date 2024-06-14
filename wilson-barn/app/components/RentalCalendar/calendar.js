'use client'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
export default function RentalCalendar({availableRentals}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    

    function isSameDay(day1, day2) {
        if (
            day1.getUTCMonth() === day2.getUTCMonth() &&
            day1.getUTCDate() === day2.getUTCDate() && 
            day1.getUTCFullYear() ===  day2.getUTCFullYear()
        ) {
            return true;
        }
        return false;
    }

    let availableRentalDates = []
    if (availableRentals) {
        for (let i=0; i<availableRentals.length; i++ ) {
            availableRentalDates.push(new Date(availableRentals[i].rentalDate))
        }
    }
    else {
        availableRentalDates = [new Date('june 15 2024'), new Date('june 16 2024'),  new Date('june 22 2024'), new Date('june 23 2024'), new Date('june 29 2024')]
    } 

    function onChange(nextDate) {
        console.log('the day youve selected is', nextDate)
        setSelectedDate(nextDate)
    }

    function tileDisabled({date, view}) {
        if (view === 'month') {
            if(!availableRentalDates.find(ddate => isSameDay(ddate, date))) {
                return date;
            }
        }
    }
    return (
        <div>
            <Calendar 
            onChange={onChange}
            value={selectedDate}
            tileDisabled={tileDisabled}
             />
        </div>
    )
}