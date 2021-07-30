
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import styles from './IndividualListing.module.css'

function IndividualListing(){
    const {listingId} = useParams().listingId


    return (
        <div className={styles.page}>
            <h1>Listing</h1> 
            <div className={styles.picturesContainer}>
            </div>
        </div>
    )
}

export default IndividualListing;