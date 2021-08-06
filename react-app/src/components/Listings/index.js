
import styles from './Listings.module.css'


import ListingCarousel from './ListingCarousel'
import Maps from './Maps'

function Listings() {


    return (
        <div className={styles.listingsPage}>
            {/* <h1>Listings</h1> */}
            <div className={styles.mapsComponent}>
                <Maps />
            </div>
            <div className={styles.listingsComponent}>
                <ListingCarousel />
            </div>
        </div>
    )
}

export default Listings;