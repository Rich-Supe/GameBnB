import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUser } from '../../store/session'
import ProfileListingsCard from './ProfileListingsCard';
import ProfileReservationsCard from './ProfileReservationsCard';
import styles from './Profile.module.css'
import demoImg from '../../assets/img/profilepicBowser.png'

function Profile(){
    const history = useHistory();
    const dispatch = useDispatch();
    const {userId} = useParams();

    const user = useSelector(state => state.session.user);
    console.log(user)

    useEffect(() => {
        dispatch(getUser(userId));
    }, [userId]);

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <div className={styles.profileCardImage}>
                    <img src={demoImg} alt="Profile Picture" className={styles.profileImg}/>
                </div>
                <div className={styles.profileCardContent}>
                    <div className={styles.profileName}>
                        <h2>Demo User</h2>
                    </div>
                    <div className={styles.profileBio}>
                        <p>Bio here:</p>
                    </div>
                </div>

            </div>
            <div className={styles.infoContainer}>
                <div className={styles.listingsCard}>
                    <ProfileListingsCard user={user}/>
                </div>
                <div className={styles.reservationCard}>
                    <ProfileReservationsCard user={user}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;