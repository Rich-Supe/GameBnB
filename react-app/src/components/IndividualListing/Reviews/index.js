
import styles from './Reviews.module.css'

function Reviews({listing}) {
    console.log("listing from reviews", listing)
    console.log(listing.reviews)
    const reviews = listing.reviews
    // if (listing.reviews.length === 0) {
    //     return <div className={styles.noReviews}>No Reviews Yet!</div>
    // }


    const reviewsBox = () => {

        return (
            <div className={styles.reviewsBox}>
                <div className={styles.reviewsBoxHeader}>
                    <h2 className={styles.header}>What people are saying about {listing.name}</h2>
                    <p>
                        <div className={styles.reviewsBoxHeaderTextDiv}>
                        <span className={styles.reviewsBoxHeaderText}>
                            There are currently {reviews.length} total reviews on {listing.name}. Have you stayed here before?
                        </span>
                        <button className={styles.addReviewBtn}>Add a review!</button>
                        </div>
                    </p>
                </div>
                <div className={styles.reviewsBoxBody}>
                    {reviews.map((review, i) => (
                        <div className={styles.reviewsBoxRow} key={i}>
                            <div className={styles.reviewsBoxRowHeader}>
                                <h3>
                                    <span className={styles.reviewsBoxRowHeaderText}>
                                        Rating: {review.rating}/5
                                    </span>
                                </h3>
                            </div>
                            <div className={styles.reviewsBoxRowBody}>
                                <div className={styles.reviewsBoxRowBodyText}>
                                    {review.comment}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.reviewsPage}>
            {/* <h2>Reviews</h2> */}
            {reviewsBox()}
        </div>
    )
}

export default Reviews