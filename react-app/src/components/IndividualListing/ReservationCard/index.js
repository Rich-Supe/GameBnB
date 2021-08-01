
import { useState, useEffect } from 'react'

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

import styles from './ReservationCard.module.css'


function ReservationCard({listing}) {
    const [ startDate, setStartDate ] = useState(null)
    const [ endDate, setEndDate ] = useState(null)


    return (
        <div className={styles.bookingCard}>
            <h1>Reservation Card</h1>
            <DateTimeRangePicker
                onChange={(startDate, endDate) => {
                    console.log(startDate, endDate)
                    setStartDate(startDate)
                    setEndDate(endDate)
                }}
                startDate={startDate}
                endDate={endDate}
            />
        </div>


    )
}

export default ReservationCard