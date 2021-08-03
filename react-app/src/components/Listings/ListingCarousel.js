import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllListings, unloadListings } from '../../store/listing'
import ListingCard from './ListingCard';
import styles from './Listings.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, {Navigation, Pagination} from 'swiper';
import SwiperCore, {
    EffectCoverflow,Pagination
} from 'swiper/core';
// import 'swiper/swiper-bundle.css'
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"

// SwiperCore.use([Navigation, Pagination])
SwiperCore.use([EffectCoverflow,Pagination]);

function ListingCarousel(){
    const dispatch = useDispatch();
    const listings = useSelector((state) => Object.values(state.listing));

    console.log("frontend listings:", listings);
    
    useEffect(() => {
        dispatch(getAllListings());
        dispatch(unloadListings());
    }, []);

    const slides = [];
    let i = 0;
    listings.forEach((listing) => {
        slides.push(
        <SwiperSlide key={`slide:${i}`} className={styles.slide}>
            <ListingCard listing={listing} />
        </SwiperSlide>
        );
        i++;
    })

    return (
            <div className={styles.listingCarousel}>
                <Swiper id="main" 
                    tag="section" 
                    wrapperTag="ul" 
                    className={styles.swiperContainer}
                    // navigation 
                    // pagination 
                    // spaceBetween={15} 
                    // slidesPerView={3}
                    loop={true}
                    effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={3} coverflowEffect={{
                        "rotate": 55,
                        "stretch": 0,
                        "depth": 100,
                        "modifier": 1,
                        "slideShadows": false
                    }} pagination={true}
                >{slides}</Swiper>
            </div>
    )
}

export default ListingCarousel;