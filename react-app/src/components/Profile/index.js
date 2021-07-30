

import styles from './Profile.module.css'

function Profile(){


    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <div className={styles.profileCardImage}>
                    <h1>Profile Img</h1>
                </div>
                <div className={styles.profileCardContent}>
                    <div className={styles.profileName}>
                        <h2>John Doe</h2>
                    </div>
                    <div className={styles.profileBio}>
                        <p>Bio here:</p>
                    </div>
                </div>

            </div>
            <div className={styles.infoContainer}>
                <div className={styles.listingsCard}>
                    <h2>Listings Card</h2>
                </div>
                <div className={styles.reservationCard}>
                    <h2>Reservations Card</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile;