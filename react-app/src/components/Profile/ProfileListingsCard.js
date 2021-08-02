
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListingsUser, unloadListings, deleteListing } from '../../store/listing'
import styles from './Profile.module.css'
import { FcDeleteDatabase } from 'react-icons/fc'
import { BiEditAlt } from 'react-icons/bi'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination])

function ProfileListingsCard({user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const listings = useSelector((state) => Object.values(state.listing));
    console.log("frontend listings:", listings);

    const deleteListing = (id) => {
        // dispatch(deleteListing(id))
        history.push('/profile/listings')
    }

    useEffect(() => {
        dispatch(getAllListingsUser(user.id));
        dispatch(unloadListings());
    }, [dispatch]);

    const slides = [];
    let i = 0;
    listings?.forEach((listing) => {
        const listingId = listing.id;
        slides.push(
        <SwiperSlide key={`slide:${i}`} className={styles.slide}>
            <div className={styles.slideContent}>
                <div className={styles.listingHeader}>
                    <h3 className={styles.listingName}>{listing.name}</h3>
                </div>
                <div className={styles.listingButtons}>
                    <div className={styles.deleteButton} onClick={() => {deleteListing(listingId)}}>
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
                    navigation 
                    pagination 
                    spaceBetween={0} 
                    slidesPerView={1}
                    // onInit={(swiper) => console.log('Swiper initialized', swiper)}
                    // onSlideChange={(swiper) => {
                    //     console.log('Swiper slide: ', swiper)
                    // }}
                    // onReachEnd={() => console.log("Swiper end")}
                >{slides}</Swiper>
            </div>
        </div>
    )
}

export default ProfileListingsCard;