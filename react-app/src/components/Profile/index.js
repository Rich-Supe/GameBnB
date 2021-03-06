import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { getUser } from '../../store/session'
import ProfileListingsCard from './ProfileListingsCard';
import ProfileReservationsCard from './ProfileReservationsCard';
import styles from './Profile.module.css'
import demoImg from '../../assets/img/profilepicBowser.png'
import { Backdrop } from '@material-ui/core'
// import SimpleModal from '../../assets/javascript/SimpleModal/SimpleModal';

function Profile(){
    // const history = useHistory();
    const dispatch = useDispatch();
    const {userId} = useParams();

    const user = useSelector(state => state.session.user);
    // console.log(user)

    useEffect(() => {
        dispatch(getUser(userId));
    }, [dispatch, userId]);

    if (user) {

    return (
        <div className={styles.profilePage}>
            <div className={styles.listingContainer}>
                <div className={styles.listingsCard}>
                    <ProfileListingsCard user={user}/>
                </div>
            </div>
            
            <div className={styles.profileCard}>
                <div className={styles.profileCardImage}>
                    <img src={demoImg} alt="Profile" className={styles.profileImg}/>
                </div>
                <div className={styles.profileCardContent}>
                    <div className={styles.profileName}>
                        <h2>{user.username}</h2>
                    </div>
                    <div className={styles.profileBio}>
                        {/* <p className={styles.bio}>{user.biography}</p> */}
                        <p className={styles.bio}>Welcome to GameBnb! Grab your listing cube on the left or reservations on the right to filter through them and edit or delete them! Navigate to the listings page and plan your next exciting adventure! If you would rather host someone elses adventure, click on Hosting in the navbar to get started! Good luck and have fun!</p>
                    </div>
                </div>

            </div>
            <div className={styles.reservationContainer}>
                <div className={styles.reservationCard}>
                    <ProfileReservationsCard user={user}/>
                </div>
            </div>
        </div>
    )
    } else {
        return (
            <>
                <Backdrop open={true}/>
            </>
        )
    }
}

export default Profile;