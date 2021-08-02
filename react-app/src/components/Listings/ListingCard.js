import React, { useState } from 'react';
import { useHistory } from 'react-router';


import styles from './Listings.module.css'

const ListingCard = ({listing}) => {
    const history = useHistory();
    const listingId = listing.id;
    let imgDiv;


    if (listing.images[0]?.image) {
        imgDiv = <img src={listing.images[0].image} className={styles.listingCardImage}/>
    } else {
        imgDiv = 
            <div className={styles.listingCardImage}>
                <h1>No images.</h1>
            </div>
    }

    return (
        <div className={styles.listingCard} onClick={() => history.push(`/individual-listing/${listingId}`)}>
            <div className={styles.listingCardImageDiv}>
                {/* <img src={listing.images[0].image} className={styles.listingCardImage}/> */}
                {imgDiv}
            </div>
            <div className={styles.listingCardInfoDiv}>
                <h2>{listing.name}</h2>
            </div>
        </div>

    )
}

export default ListingCard;