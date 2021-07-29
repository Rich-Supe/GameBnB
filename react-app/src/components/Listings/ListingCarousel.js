import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllListings } from '../../store/listing'

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

    return (
        <div className="listing-carousel">
            <h1>Carousel</h1>
        </div>
    )
}

export default ListingCarousel;