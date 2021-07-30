


import styles from './ListingInfo.module.css'

function ListingInfo({listing}){
    console.log(listing.user_id)
    // Should I get the owner's info??



    return (
        <div className={styles.listingInfo}>
            <h1>Listing Info</h1>
        </div>
    )
}

export default ListingInfo;