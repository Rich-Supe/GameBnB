
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReservation } from '../../../store/reservation';

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import styles from './ReservationCard.module.css';


function ReservationCard({listing}) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, onChange] = useState([new Date(), new Date()]);
    const [ numOfGuests, setNumOfGuests ] = useState(1);
    console.log('currentUser:', user)
    console.log("date:", value)
    console.log("guests:", numOfGuests)
    
    let startDay;
    let endDay;
    let daysReserved;
    let totalPrice;

    if (value[0] && value[1]) {
        startDay = value[0].getDate();
        endDay = value[1].getDate();
        console.log("start/end:", startDay, endDay)
        getDaysReserved();
    }

    function getDaysReserved() {
        if (endDay - startDay > 0) {
        daysReserved = endDay - startDay;
        } else {
            daysReserved = endDay + (30 - startDay);
        }
        console.log("days reserved:", daysReserved)
        totalPrice = daysReserved * listing.price;
        console.log("total price:", totalPrice)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            listing_id: listing.id,
            user_id: user.id,
            start_date: value[0],
            end_date: value[1],
            days: daysReserved,
            guests: parseInt(numOfGuests, 10),
            price: totalPrice
        }

        console.log("Reservation:", payload)
        const reservation = await dispatch(createReservation(payload));
        // if (reservation) {
            history.push(`/users/${user.id}`)
        // }
    }


        //     sq_ft: 20000
        // total_bathrooms: 7
        // total_bedrooms: 10


    return (
        <div className={styles.reservationCardContainer}>
            <form className={styles.reservationCard} onSubmit={onSubmit}>
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
                    <select className={styles.selectGuests} id="guest" onChange={(e) => setNumOfGuests(e.target.value)}>
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
                <div className={styles.price}>
                    <h4 className={styles.priceLabel}>Total Price:</h4>
                    <span className={styles.priceSpan}>${totalPrice}.00</span>
                </div>
                <div className={styles.submit}>
                    <button className={styles.submitButton} type="submit">Reserve</button>
                </div>
            </form>
        </div>


    )
}

export default ReservationCard