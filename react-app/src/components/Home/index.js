

import styles from './Home.module.css'
import banner from '../../assets/img/bannerGame.jpg'

function Home(){

    return (
        <div className={styles.homePage}>
            <div className={styles.banner}>
                <img src={banner} alt="banner" className={styles.bannerImg}/>
            </div>
        </div>
    )
}

export default Home