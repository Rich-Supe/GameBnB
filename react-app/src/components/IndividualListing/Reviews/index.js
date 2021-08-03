
import styles from './Reviews.module.css'

function Reviews({listing}) {


    // if (listing.reviews.length === 0) {
    //     return <div className={styles.noReviews}>No Reviews Yet!</div>
    // }


    // const reviewsBox = () => {
    //     return (
    //         <div className={styles.reviewsBox}>
    //             <div className={styles.reviewsBoxHeader}>
    //                 <h2>Reviews</h2>
    //                 <p>
    //                     <span className={styles.reviewsBoxHeaderText}>
    //                         {reviews.length} reviews
    //                     </span>
    //                 </p>
    //             </div>
    //             <div className={styles.reviewsBoxBody}>
    //                 {this.props.reviews.map((review, i) => (
    //                     <div className={styles.reviewsBoxRow} key={i}>
    //                         <div className={styles.reviewsBoxRowHeader}>
    //                             <h3>
    //                                 <span className={styles.reviewsBoxRowHeaderText}>
    //                                     {review.name}
    //                                 </span>
    //                             </h3>
    //                         </div>
    //                         <div className={styles.reviewsBoxRowBody}>
    //                             <div className={styles.reviewsBoxRowBodyText}>
    //                                 {review.text}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className={styles.reviewsPage}>
            <h2>Reviews</h2>
            {/* {reviewsBox()} */}
        </div>
    )
}

export default Reviews