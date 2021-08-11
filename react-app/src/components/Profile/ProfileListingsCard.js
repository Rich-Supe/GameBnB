
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListingsUser, deleteListing } from '../../store/listing'
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

function ProfileListingsCard({user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const listings = useSelector((state) => Object.values(state.listing));
    // console.log("frontend listings:", listings);

    const deleteListingFunction = (id) => {
        // console.log("Attemting to delete listing!", id)
        dispatch(deleteListing(id))
    }

    useEffect(() => {
        dispatch(getAllListingsUser(user.id));
        // return () => dispatch(unloadListings());
    }, [dispatch, user.id]);

    
    const slides = [];
    let i = 0;
    listings?.forEach((listing) => {
        console.log(listing);
        const listingId = listing.id;

        let bkgImage;
        if (listing.images && listing.images.length > 0) {
            bkgImage = listing.images[0].image
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
            justifyContent: 'flex-start',
            alignItems: 'center',
            border: '3px ridge #F53240',
            boxShadow: '0px 0px 10px 3px #F53240',
        }

        const btnStyles = {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.3em',
            margin: '30px',
        }

        const btns = {
            // margin: '60px',
            fontSize: '1.4em',
        }

        const listingInfo = {
            color: 'white',
            fontSize: '1.2em',
            textShadow: '2px 1px 9px rgba(0, 0, 0, 1)',
            margin: '20px 20px',
        }

        slides.push(
        <SwiperSlide key={`slide:${i}`} className={styles.slideL}>
            <div className={styles.slideContent} style={styles}>
                <div className={styles.listingHeader}>
                    <h3 className={styles.listingName}>{listing.name}</h3>
                </div>
                <div className={styles.listingInfo} style={listingInfo}>
                    <div className={styles.listingInfoRow}>
                        <div className={styles.listingInfoRowLabel}>Price/Day: {listing.price}</div>
                    </div>
                    <div className={styles.listingInfoRow}>
                        <div className={styles.listingInfoRowLabel}>Total Reviews: {listing.reviews.length}</div>
                    </div>
                    <div className={styles.listingInfoRow}>
                        <div className={styles.listingInfoRowLabel}>Total Images: {listing.images.length}</div>
                    </div>
                </div>
                <div className={styles.listingButtons} style={btnStyles}>
                    <div className={styles.deleteButton} onClick={() => {deleteListingFunction(listingId)}}>
                        <MdDeleteForever className={styles.deleteIcon} style={btns}/>
                    </div>
                    <div className={styles.editButton} onClick={() => {history.push(`/edit-listing/${listingId}`)}}>
                        <BiEditAlt className={styles.editIcon} style={btns} onClick={() => {history.push(`/edit-listing/${listingId}`)}}/>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        );
        i++;
    })

    // if (user.host != true) {
    //     return (
    //         <div className="card">
    //             <h1>You need to be a host to make listings! Become one?</h1>
    //             <button>Yes!</button>
    //         </div>
    //     );
    // };

    let listingSwiper;

    const info = (
    <>
        <h2 id="simple-modal-title">Listings</h2>
            <p id="simple-modal-description">
                These are all of your listings! Click the delete button to remove them,
                or click the edit button to edit them. If you want to add another listing for others to expolore
                click the hosting tab!
            </p>
    </>
    );

    if (listings.length > 0) {
        listingSwiper = (
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
                        "shadowOffset": 60,
                        "shadowScale": 0.9
                    }}
                    // pagination={true}
                >{slides}</Swiper>
        );
    } else {
        listingSwiper = (
            <div className={styles.noReservations}>
                <h3 className={styles.noResHeader}>No Listings yet!</h3>
                <button className={styles.noneBtn} onClick={() => {history.push(`/new-listing/${user.id}`)}}>Lets Create One!</button>
            </div>
        );
    }

    return (
        <div className={styles.profileListingsCard}>
            <h2 className={styles.listingHeader}>
                Your Listings ({listings.length})
                <SimpleModal info={info}/>
            </h2>
            <div className={styles.listingCarousel}>
                {listingSwiper}
            </div>
        </div>
    )
}

export default ProfileListingsCard;