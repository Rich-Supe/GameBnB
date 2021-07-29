import React, { useState } from 'react';
import { useHistory } from 'react-router';


const ListingCard = ({listing}) => {
    const history = useHistory();
    console.log('listing', listing)

    return (
        <div className="listing-card">
            <div className="listing-card-image">
                <img src={listing.images[0].image} />
            </div>
        </div>

    )
}

export default ListingCard;