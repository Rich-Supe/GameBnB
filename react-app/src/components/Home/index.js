

import styles from './Home.module.css'
import banner from '../../assets/img/bannerGame.jpg'

function Home(){

    return (
        <div className={styles.HomePage}>
            <h1>Home</h1>
            <div className={styles.banner}>
                <img src={banner} alt="banner" />
            </div>
        </div>
    )
}

export default Home