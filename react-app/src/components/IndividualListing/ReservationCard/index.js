
import { useState, useEffect } from 'react'

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

import styles from './ReservationCard.module.css'


function ReservationCard({listing}) {
    const [value, onChange] = useState([new Date(), new Date()]);
    const [ numOfGuests, setNumOfGuests ] = useState(1);
    // const [ totalPrice, setTotalPrice ] = useState(0);
    // const [ startDay, setStartDay ] = useState('');
    // const [ endDay, setEndDay ] = useState('');
    console.log("date:", value)
    
    let startDay;
    let endDay;
    let daysReserved;
    let totalPrice;

    if (value[0] && value[1]) {
        startDay = value[0].getDate();
        endDay = value[1].getDate();
        console.log(startDay, endDay)
        getDaysReserved();
    }

    function getDaysReserved() {
        if (endDay - startDay > 0) {
        daysReserved = endDay - startDay;
        } else {
            daysReserved = endDay + (30 - startDay);
        }
        console.log(daysReserved)
        totalPrice = daysReserved * listing.price;
        console.log(totalPrice)
    }

        //     sq_ft: 20000
        // total_bathrooms: 7
        // total_bedrooms: 10


    return (
        <div className={styles.reservationCardContainer}>
            <div className={styles.reservationCard}>
                <div className={styles.header}>
                    {/* <div className={styles.headerRight}> */}
                        <h4>${listing.price}.00/Night</h4>
                    {/* </div> */}
                    {/* <div className={styles.headerLeft}>
                        Stars
                    </div> */}
                </div>
                <div className={styles.date}>
                    <DateTimeRangePicker
                        onChange={onChange}
                        value={value}
                    />
                </div>
                <div className={styles.guests}>
                    <label htmlFor="guest" className={styles.guestLabel}>How Many Guests?</label>
                    <select className={styles.selectGuests} id="guest">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className={styles.extraInfo}>
                    <div className={styles.infoDiv}>
                        <h4 className={styles.infoLabel}>Square Feet:</h4>
                        <span className={styles.labelSpan}>{listing.sq_ft}</span>
                    </div>
                    <div className={styles.infoDiv}>
                        <h4 className={styles.infoLabel}>Bathrooms:</h4>
                        <span className={styles.labelSpan}>{listing.total_bathrooms}</span>
                    </div>
                    <div className={styles.infoDiv}>
                        <h4 className={styles.infoLabel}>Bedrooms:</h4>
                        <span className={styles.labelSpan}>{listing.total_bedrooms}</span>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ReservationCard