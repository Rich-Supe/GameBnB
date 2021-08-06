

import styles from './Home.module.css'
import banner from '../../assets/img/bannerGame.jpg'
import Footer from '../Footer'

function Home(){

    return (
        <div className={styles.homePage}>
            <div className={styles.banner}>
                <img src={banner} alt="banner" className={styles.bannerImg}/>
            </div>
            <div className={styles.randomListingDiv}></div>
            <Footer/>
        </div>
    )
}

export default Home