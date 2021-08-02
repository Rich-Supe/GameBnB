
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { getAllListingsUser } from '../../store/listing'
import styles from './Profile.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination])

function ProfileReservationsCard({user}) {


    return (
        <div className="reservations-card">
            Your Reservations
        </div>
    )
}

export default ProfileReservationsCard;