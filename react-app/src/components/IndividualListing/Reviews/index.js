
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../../store/review'
import { removeReviewFromListing} from '../../../store/listing'

import styles from './Reviews.module.css'
import { GiCrossMark } from 'react-icons/gi'
import { RiEdit2Fill } from 'react-icons/ri'

function Reviews({listing}) {
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log("listing from reviews", listing)
    const listingId = listing.id
    const user = useSelector(state => state.session.user);
    const reviews = listing.reviews
    // if (listing.reviews.length === 0) {
    //     return <div className={styles.noReviews}>No Reviews Yet!</div>
    // }
    let rating;

    const handleDelete = async (reviewId, listingId) => {
        const del = await dispatch(deleteReview(reviewId))
        const rmvReviewFromListing = await dispatch(removeReviewFromListing(reviewId, listingId))
        // console.log(del, rmvReviewFromListing)
        history.push(`/individual-listing/${listingId.id}`);
    }

    const reviewOwnershipCheck = (reviewsUserId, review, listingId) => {
        if (user.id === reviewsUserId) {
            rating = (
                <div className={styles.reviewDiv}>
                    <span className={styles.reviewsBoxRowHeaderText}>
                        Rating: {review.rating}/5
                    </span>
                    <div className={styles.deleteDiv} onClick={() => handleDelete(review.id, listingId)}>
                        <GiCrossMark className={styles.reviewsDelete} />
                        <p className={styles.deleteTag}>Delete?</p>
                    </div>
                    <div className={styles.editDiv} onClick={() => history.push(`/edit-review/${review.id}`)}>
                        <RiEdit2Fill className={styles.reviewsEdit} />
                        <p className={styles.editTag}>Edit</p>
                    </div>
                </div>
            )
        } else {
            rating = (
                <div className={styles.reviewDiv}>
                    <span className={styles.reviewsBoxRowHeaderText}>
                        Rating: {review.rating}/5
                    </span>
                </div>
            )
        }
        return rating;
    }


    const reviewsBox = () => {

        return (
            <div className={styles.reviewsBox}>
                <div className={styles.reviewsBoxHeader}>
                    <h2 className={styles.header}>What people are saying about {listing.name}</h2>
                    {/* <p> */}
                        <div className={styles.reviewsBoxHeaderTextDiv}>
                        <span className={styles.reviewsBoxHeaderText}>
                            There are currently {reviews.length} total reviews on {listing.name}. Have you stayed here before?
                        </span>
                        <button className={styles.addReviewBtn} onClick={() => {history.push(`/add-review/${listingId}`)}}>Add a review!</button>
                        </div>
                    {/* </p> */}
                </div>
                <div className={styles.reviewsBoxBody}>
                    {reviews?.map((review, i) => (
                        <div className={styles.reviewsBoxRow} key={i}>
                            <div className={styles.reviewsBoxRowHeader}>
                                {/* <h3>
                                    <span className={styles.reviewsBoxRowHeaderText}>
                                        Rating: {review.rating}/5
                                    </span>
                                </h3> */}
                                {reviewOwnershipCheck(review.user_id, review, listing)}
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
        <>
            <div className={styles.reviewsPage}>
                {/* <h2>Reviews</h2> */}
                {reviewsBox()}
            </div>
            <div className={styles.ending}>
            </div>
        </>
    )
}

export default Reviews