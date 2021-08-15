


import styles from './ListingInfo.module.css';
import { GiCastle, GiAnimalSkull, GiBooze, GiBrute, GiCandleHolder, GiChest, 
    GiChicken, GiChewedSkull, GiCutDiamond, GiFarmer, GiFemaleLegs, GiHealthPotion } from 'react-icons/gi';

function ListingInfo({listing}){
    // console.log(listing.user_id)
    // Should I get the owner's info??

    return (
        <div className={styles.listingInfo}>
            <div className={styles.listingInfoCard}>
                <div className={styles.header}>
                    <h2>Info</h2>
                </div>
                <div className={styles.basicInfo}>
                    <ul className={styles.infoList}>
                        <li className={styles.listItem}>
                            <GiCastle className={styles.icon}/>
                            Entire place and surrounding area are yours!
                        </li>
                        <li className={styles.listItem}>
                            <GiAnimalSkull className={styles.icon}/>
                            Animals and Creatures are dangerous!
                        </li>
                        <li className={styles.listItem}>
                            <GiBooze className={styles.icon}/>
                            Alcohol and food on site!
                        </li>
                        <li className={styles.listItem}>
                            <GiBrute className={styles.icon}/>
                            Boss lives here, enter dungeon at your own risk!
                        </li>
                    </ul>
                </div>
                <div className={styles.description}>
                    <p>{listing.description}</p>
                </div>
                <div className={styles.amenities}>
                    <div className={styles.row1}>
                        <ul className={styles.amenitiesList}>
                            <li className={styles.amenityItem}>
                                <GiCandleHolder className={styles.icon}/>
                            </li>
                            <li className={styles.amenityItem}>
                                <GiChest className={styles.icon}/>
                            </li>
                            <li className={styles.amenityItem}>
                                <GiChicken className={styles.icon}/>
                            </li>
                            <li className={styles.amenityItem}>
                                <GiChewedSkull className={styles.icon}/>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.row2}>
                        <ul className={styles.amenitiesList}>
                            <li className={styles.amenityItem}>
                                <GiCutDiamond className={styles.icon}/>
                            </li>
                            <li className={styles.amenityItem}>
                                <GiFarmer className={styles.icon}/>
                            </li>
                            <li className={styles.amenityItem}>
                                <GiFemaleLegs className={styles.icon}/>
                            </li>
                            <li className={styles.amenityItem}>
                                <GiHealthPotion className={styles.icon}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingInfo;