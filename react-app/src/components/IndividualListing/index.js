
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getListing,  } from '../../store/listing'
import ListingInfo from './ListingInfo';

import styles from './IndividualListing.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination])

function IndividualListing(){
    const dispatch = useDispatch();
    const {listingId} = useParams();
    const listing = useSelector( (state) => state.listing[listingId])
    console.log(listing)

    useEffect(() => {
        // (async () => {
        dispatch(getListing(listingId))

        // })();
    }, [dispatch])

    
    if (listing) {

        const images = listing.images
        const slides = [];
        let i = 0;
        images.forEach(image => {
            slides.push(
                <SwiperSlide key={i++}>
                    <img src={image.image} alt={image.alt} className={styles.image}/>
                </SwiperSlide> 
            )
        })



    return (
        <div className={styles.page}>
            <h1>{listing.name}</h1> 
            <div className={styles.picturesContainer}>
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
            <div className={styles.listingBottom}>
                <ListingInfo listing={listing}/>
            </div>
        </div>
    )}
    else {
        return <div>Loading...</div>
    }
}

export default IndividualListing;