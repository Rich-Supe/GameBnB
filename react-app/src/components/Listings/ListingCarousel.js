import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllListings } from '../../store/listing'
import ListingCard from './ListingCard';
import styles from './Listings.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination])

function ListingCarousel(){
    const dispatch = useDispatch();
    const listings = useSelector((state) => Object.values(state.listing));

    console.log("frontend listings:", listings);
    
    useEffect(() => {
        dispatch(getAllListings());
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
                    navigation 
                    pagination 
                    spaceBetween={0} 
                    slidesPerView={2}
                    // onInit={(swiper) => console.log('Swiper initialized', swiper)}
                    // onSlideChange={(swiper) => {
                    //     console.log('Swiper slide: ', swiper)
                    // }}
                    // onReachEnd={() => console.log("Swiper end")}
                >{slides}</Swiper>
            </div>
    )
}

export default ListingCarousel;