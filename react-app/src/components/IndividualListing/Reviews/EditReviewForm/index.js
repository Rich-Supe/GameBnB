import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { getListing } from '../../../../store/listing';
import { getReview } from '../../../../store/review';
import EditPage from './EditPage'

import styles from './EditReviewForm.module.css'

function EditReviewForm() {
    const dispatch = useDispatch();
    const { reviewId } = useParams();    
    // console.log (reviewId);
    const review = useSelector( (state) => state.review.review);
    // console.log("review from edit:", review)

    useEffect(() => {
        dispatch(getReview(reviewId));
    }, [dispatch, reviewId]);

    if (review) {

    return (
        <>
            <EditPage review={review}/>
        </>
    )
    } else {
        return (
            <div className={styles.error}>
                <h1>Loading...</h1>
                <p>Review not found</p>
            </div>
        )
    }
}

export default EditReviewForm;