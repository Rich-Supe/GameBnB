
import { useHistory } from 'react-router-dom'


import styles from './Home.module.css'
// import banner from '../../assets/img/splashBanner.png'
import Footer from '../Footer'

function Home(){
    const history = useHistory();

    const handleRandom = (e) => {
        e.preventDefault();
        let num = Math.floor(Math.random() * 10)
        // console.log(num)
        if (num > 6) {
            num = (num - 4)
        }
        if (num === 0) {
            num = 5
        }
        // console.log(num)

        history.push(`individual-listing/${num}`)
    }

    // handleRandom();

    return (
        <div className={styles.homePage}>
            <div className={styles.banner}>
                <div className={styles.bannerHeader}>
                    <h1 className={styles.headerText}>Gamebnb</h1>
                </div>
                {/* <img src={banner} alt="banner" className={styles.bannerImg}/> */}
            </div>
            <div className={styles.explore}>
                <h1 className={styles.exploreHeader}>Explore and Create New Worlds</h1>
                <div className={styles.imageContainer}>
                    <div className={styles.imageBox1}>

                    </div>
                    <div className={styles.imageBox2}>
                        
                    </div>
                    <div className={styles.imageBox3}>
                        
                    </div>
                </div>
            </div>
            <div className={styles.randomListingDiv}>
                <h1 className={styles.randomHeader}>Not Sure Where to Start? No Problem.</h1>
                <div className={styles.randomDiv}>
                    <button className={styles.randBtn} onClick={(e) => handleRandom(e)}>Take me to a random listing!</button>
                </div>
            </div>
            <div className={styles.footerSpace}>
            </div>
            <Footer/>
        </div>
    )
}

export default Home