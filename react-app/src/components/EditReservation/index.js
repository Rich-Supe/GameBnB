
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { getReservation } from '../../store/reservation'
import EditReservationCard from './EditReservationCard';

import styles from './EditReservation.module.css'

function EditReservation(){
    const dispatch = useDispatch();
    // const history = useHistory();
    const { reservationId } = useParams();
    const reservation = useSelector((state) => state.reservation[reservationId]);
    console.log(reservation);

    useEffect(() => {
        dispatch(getReservation(reservationId));
    }, [dispatch, reservationId]);

    if (reservation) {
        const stylePage = {
            backgroundImage: `url(${reservation.image})`,
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
        }

    return (
        <div className={styles.editReservation} style={stylePage}>
            <h1 className={styles.header}>Edit your {reservation.name} reservation</h1>
            <EditReservationCard reservation={reservation}/>
        </div>
    )
}}

export default EditReservation;