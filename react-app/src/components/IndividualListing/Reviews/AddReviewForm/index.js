import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import styles from './AddReviewForm.module.css'

function AddReviewForm() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ rating, setRating ] = useState(1);
    const [ comment, setComment ] = useState('');
    

    const onSubmit = async(e) => {
        e.preventDefualt();
        console.log("submitted!")

        // const payload = {
        //     listing_id = listing.id,
        //     user_id = user.id,
        //     rating = rating,
        //     comment = comment,
        // };

        // console.log("review:;", payload)
        // dispatch(createReview(payload));
        // history.push("/listings/" + listing.id);
    };

    return (
        <div className={styles.ReviewFormPage}>
            <form className={styles.form} onSubmit={onSubmit}>
                <header>AddReviewForm</header>
                <div className={styles.formBody}>
                    <div className={styles.formRating}></div>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" />
                    </div>

            </form>
        </div>
    )
}

export default AddReviewForm;
