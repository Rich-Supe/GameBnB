
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getListing,  } from '../../store/listing'
import ListingInfo from './ListingInfo';
import ReservationCard from './ReservationCard';
import Reviews from './Reviews';

import styles from './IndividualListing.module.css'
import { Backdrop } from '@material-ui/core'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper/core';
import 'swiper/swiper-bundle.css'
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

function IndividualListing(){
    const dispatch = useDispatch();
    const {listingId} = useParams();
    const user = useSelector(state => state.session.user);
    const listing = useSelector( (state) => state.listing[listingId])
    // console.log(listing)

    useEffect(() => {
        // (async () => {
        dispatch(getListing(listingId))

        // })();
    }, [dispatch, listingId]);

    
    if (listing && user) {

        const images = listing.images
        const slides = [];
        let i = 0;
        images.forEach(image => {
            slides.push(
                <SwiperSlide key={i++} className={styles.swiperSlide}>
                    <img src={image.image} alt={image.alt} className={styles.image}/>
                </SwiperSlide> 
            )
        })


    return (
        <div className={styles.page}>
            <h1 className={styles.header}>{listing.name}</h1> 
            <div className={styles.picturesContainer}>
                <Swiper id="main" 
                        tag="section" 
                        wrapperTag="ul" 
                        className={styles.swiperContainer}
                        // pagination={{
                        //     "type": "progressbar"
                        // }} 
                        // navigation={true}
                        loop={true}
                        spaceBetween={100} 
                        slidesPerView={2}

                        autoplay={{
                            "delay": 2500,
                            "disableOnInteraction": false
                        }} pagination={{
                            "clickable": true
                        }} navigation={false}

                        // onInit={(swiper) => console.log('Swiper initialized', swiper)}
                        // onSlideChange={(swiper) => {
                        //     console.log('Swiper slide: ', swiper)
                        // }}
                        // onReachEnd={() => console.log("Swiper end")}
                    >{slides}</Swiper>
            </div>
            <div className={styles.listingBottom}>
                <div className={styles.infoAndReservationDiv}>
                    <ListingInfo listing={listing}/>
                    <ReservationCard listing={listing}/>
                </div>
                <div className={styles.reviewsDiv}>
                    <Reviews listing={listing}/>
                </div>
            </div>
        </div>
    )}
    else {
        return <Backdrop open={true}/>
    }
}

export default IndividualListing;