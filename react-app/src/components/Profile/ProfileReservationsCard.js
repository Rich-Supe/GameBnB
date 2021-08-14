
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations, deleteReservation } from '../../store/reservation'
import styles from './Profile.module.css'
import { MdDeleteForever } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import SimpleModal from '../../assets/javascript/SimpleModal/SimpleModal';
import bkgImgNone from '../../assets/img/newIcon.png'

import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, {Navigation, Pagination} from 'swiper';
import SwiperCore, {
    EffectCube,Pagination
} from 'swiper/core';
// import 'swiper/swiper-bundle.css'
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"
import "swiper/components/pagination/pagination.min.css"

// SwiperCore.use([Navigation, Pagination])
SwiperCore.use([EffectCube,Pagination]);

function ProfileReservationsCard({user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const reservations = useSelector((state) => Object.values(state.reservation));
    // console.log("reservations:", reservations)

    useEffect(() => {
        dispatch(getAllReservations(user.id));
        // dispatch(unloadReservation)
    }, [dispatch, user.id]);

    const deleteReservationFunction = (id) => {
        // console.log("Attemting to delete reservation!", id)
        dispatch(deleteReservation(id))
        history.push('/')
    }

    const slides = [];
    let i = 0;
    reservations?.forEach((reservation) => {
        // console.log(reservation);
        const reservationId = reservation.id;
        let bkgImage;
        if (reservation.image) {
            bkgImage = reservation.image
        } else {  
            bkgImage = bkgImgNone;
        }

        const styles = {
            // backgroundColor: 'black',
            backgroundImage: 'url(' + bkgImage + ')',
            backgroundSize: 'cover',
            height: '98%',
            width: '98%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '3px ridge #02C8A7',
            boxShadow: '0px 0px 10px 3px #02C8A7',
        }

        const btnStyles = {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.3em',
            // margin: '30px',
        }

        const btns = {
            // margin: '20px, 50px, 10px, 50px',
            fontSize: '1.4em',
            color: '#F53240'
        }

        const btns2 = {
            // margin: '60px',
            fontSize: '1.4em',
            // border: '1px solid black',
        }

        const listingInfo = {
            color: 'white',
            fontSize: '1.2em',
            textShadow: '2px 1px 9px rgba(0, 0, 0, 1)',
            margin: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        slides.push(
            <SwiperSlide key={`slide:${i}`} className={styles.slideR}>
            <div className={styles.slideContent} style={styles}>
                <div className={styles.listingHeader}>
                    <h3 className={styles.listingName}>{reservation.name}</h3>
                </div>
                <div className={styles.listingInfo} style={listingInfo}>
                    <div className={styles.listingInfoRow}>
                        <div className={styles.listingInfoRowLabel}>Days: {reservation.days}</div>
                    </div>
                    <div className={styles.listingInfoRow}>
                        <div className={styles.listingInfoRowLabel}>Guests: {reservation.guests}</div>
                    </div>
                    <div className={styles.listingInfoRow}>
                        <div className={styles.listingInfoRowLabel}>Price: ${reservation.price}.00</div>
                    </div>
                </div>
                <div className={styles.listingButtons} style={btnStyles}>
                    <div className={styles.deleteButton} onClick={() => {deleteReservationFunction(reservationId)}}>
                        <MdDeleteForever className={styles.deleteIcon} style={btns}/>
                    </div>
                    <div className={styles.editButton} onClick={() => {history.push(`/edit-reservation/${reservationId}`)}}>
                        <BiEditAlt className={styles.editIcon} style={btns2} onClick={() => {history.push(`/edit-reservation/${reservationId}`)}}/>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        );
        i++;
    });

    const infoHeaderStyles = {
        fontSize: '2em',
        // textShadow: '2px 1px 9px rgba(0, 0, 0, 1)',
        padding: '5px', 
        marginBottom: '5px',
        marginTop: '5px',
        borderBottom: '1px solid black',
    }

    const info = (
        <>
            <h2 id="simple-modal-title" style={infoHeaderStyles}>Reservations</h2>
                <p id="simple-modal-description">
                    These are all of your Reservations! Click the delete button to remove them,
                    or click the edit button to edit them. If you want to add another reservation
                    go to the listings tab and explore all of the options!
                </p>
        </>
        );

    let reservationSwiper;

    if (reservations.length > 0) {
        reservationSwiper = (
            <Swiper id="main" 
                    tag="section" 
                    wrapperTag="ul" 
                    className={styles.swiperContainer}
                    // navigation 
                    // pagination 
                    // spaceBetween={} 
                    // slidesPerView={1}
                    effect={'cube'} grabCursor={true} cubeEffect={{
                        "shadow": true,
                        "slideShadows": true,
                        "shadowOffset": 60,
                        "shadowScale": 0.9,
                    }} 
                    // pagination={true}
                >{slides}</Swiper>
        );
    }
    else {
        reservationSwiper = (
            <div className={styles.noReservations}>
                <h3 className={styles.noResHeader}>No Reservations yet!</h3>
                <button className={styles.noneBtn} onClick={() => {history.push('/listings')}}>Lets Add Some!</button>
            </div>
        );
    }

    return (
        <div className={styles.profileListingsCard}>
            <h2 className={styles.listingHeader}>
                Your Reservations ({reservations.length})
                <SimpleModal info={info}/>
                </h2>
            <div className={styles.listingCarousel}>
                {reservationSwiper}
                {/* <Swiper id="main" 
                    tag="section" 
                    wrapperTag="ul" 
                    className={styles.swiperContainer}
                    // navigation 
                    // pagination 
                    // spaceBetween={} 
                    // slidesPerView={1}
                    effect={'cube'} grabCursor={true} cubeEffect={{
                        "shadow": true,
                        "slideShadows": true,
                        "shadowOffset": 40,
                        "shadowScale": 0.9,
                    }} pagination={true}
                >{slides}</Swiper> */}
            </div>
        </div>
    )
}

export default ProfileReservationsCard;