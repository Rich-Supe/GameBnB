
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListingsUser, unloadListings, deleteListing } from '../../store/listing'
import styles from './Profile.module.css'
import { FcDeleteDatabase } from 'react-icons/fc'
import { BiEditAlt } from 'react-icons/bi'

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

function ProfileListingsCard({user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const listings = useSelector((state) => Object.values(state.listing));
    console.log("frontend listings:", listings);

    const deleteListingFunction = (id) => {
        console.log("Attemting to delete listing!", id)
        dispatch(deleteListing(id))
        history.push('/profile/listings')
    }

    useEffect(() => {
        dispatch(getAllListingsUser(user.id));
        dispatch(unloadListings());
    }, []);

    const slides = [];
    let i = 0;
    listings?.forEach((listing) => {
        const listingId = listing.id;
        slides.push(
        <SwiperSlide key={`slide:${i}`} className={styles.slideL}>
            <div className={styles.slideContent}>
                <div className={styles.listingHeader}>
                    <h3 className={styles.listingName}>{listing.name}</h3>
                </div>
                <div className={styles.listingButtons}>
                    <div className={styles.deleteButton} onClick={() => {deleteListingFunction(listingId)}}>
                        <FcDeleteDatabase className={styles.deleteIcon}/>
                    </div>
                    <div className={styles.editButton} onClick={() => {history.push(`/edit-listing/${listingId}`)}}>
                        <BiEditAlt className={styles.editIcon}/>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        );
        i++;
    })

    if (user.host != true) {
        return (
            <div className="card">
                <h1>You need to be a host to make listings! Become one?</h1>
                <button>Yes!</button>
            </div>
        );
    };

    return (
        <div className={styles.profileListingsCard}>
            <h2 className={styles.listingHeader}>Your Listings</h2>
            <div className={styles.listingCarousel}>
                <Swiper id="main" 
                    tag="section" 
                    wrapperTag="ul" 
                    className={styles.swiperContainer}
                    // navigation 
                    // pagination 
                    // spaceBetween={} 
                    // slidesPerView={1}
                    // loop={true}
                    effect={'cube'} grabCursor={true} cubeEffect={{
                        "shadow": true,
                        "slideShadows": true,
                        "shadowOffset": 40,
                        "shadowScale": 0.94
                    }} pagination={true}
                >{slides}</Swiper>
            </div>
        </div>
    )
}

export default ProfileListingsCard;