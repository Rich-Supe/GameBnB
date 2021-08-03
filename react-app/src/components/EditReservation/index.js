
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getReservation } from '../../store/reservation'
import EditReservationCard from './EditReservationCard';

import styles from './EditReservation.module.css'

function EditReservation(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();
    const reservation = useSelector((state) => state.reservation[reservationId]);
    console.log(reservation);

    useEffect(() => {
        dispatch(getReservation(reservationId));
    }, [dispatch, reservationId]);

    if (reservation) {

    return (
        <div className={styles.editReservation}>
            <h1>Edit Reservation</h1>
            <EditReservationCard reservation={reservation}/>
        </div>
    )
}}

export default EditReservation;