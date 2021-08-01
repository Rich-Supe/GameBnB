
import { useState, useEffect } from 'react'

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

import styles from './ReservationCard.module.css'


function ReservationCard({listing}) {
    const [ startDate, setStartDate ] = useState(null)
    const [ endDate, setEndDate ] = useState(null)


    return (
        <div className={styles.reservationCardContainer}>
            <div className={styles.reservationCard}>
                <div className={styles.header}>
                    <div className={styles.headerRight}>
                        /Night
                    </div>
                    <div className={styles.headerLeft}>
                        Stars
                    </div>
                </div>
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
        </div>


    )
}

export default ReservationCard