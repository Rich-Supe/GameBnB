import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListing } from '../../../../../store/listing';
import { editReview} from '../../../../../store/review';

import styles from './EditPage.module.css'

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function EditPage({review}) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    // const { reviewId } = useParams();
    // const review = useSelector( (state) => state.review[reviewId]);
    const [ comment, setComment ] = useState(review.comment);
    const [value, setValue] = useState(review.rating);
    const [hover, setHover] = useState(-1);
    // console.log("review from edit prop:", review)
    const listingId = review.listing_id
    const listing = useSelector( (state) => state.listing[listingId]);

    // useEffect(() => {
    //     dispatch(getReview(reviewId));
    // }, [dispatch, reviewId]);

    useEffect(() => {
        dispatch(getListing(listingId));
    }, [dispatch, listingId]);


    const labels = {
        0.5: 'Terrible',
        1: 'Bad',
        1.5: 'Poor',
        2: 'Meh',
        2.5: 'Ok',
        3: 'Decent',
        3.5: 'Good',
        4: 'Nice',
        4.5: 'Excellent',
        5: 'Perfect!',
    };
    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });
    
    const classes = useStyles();

    if (!review) {
        console.log("review not found")
        return null;
    }
    
    // console.log('listing from review form', listing)
    

    // console.log("rating:", value, "review:", comment)
    
    


    if (listing) {

    const onSubmit = async(e) => {
        e.preventDefault();
        // console.log("submitted!")

        const payload = {
            listing_id: listingId,
            user_id: user.id,
            rating: value,
            comment: comment,
        };

        // console.log("review: after edit:", payload)
        dispatch(editReview(payload, review.id));
        history.push("/individual-listing/" + listing.id);
    };


    return (
        <div className={styles.reviewFormPage}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h3 className={styles.header}>Edit {listing.name} Review:</h3>
                    <div className={styles.formBody}>
                        <div className={styles.formRating}>
                            <div className={classes.root}>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                    }}
                                />
                                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                            </div>
                        </div>
                        <div className={styles.formComment}>
                            <label htmlFor="comment" className={styles.label}>Review here:</label>
                            <textarea name="comment" id="comment" value={comment} className={styles.area} onChange={(e) => setComment(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.formFooter}>
                        <button className={styles.return} onClick={() => history.push("/individual-listing/" + listing.id)}>Return</button>
                        <button className={styles.button} type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imageCard}>
                    <img src={listing.images[0]?.image} alt="listing" className={styles.image}/>
                </div>
            </div>

        </div>
    )
    } else {
        return <div>Loading...</div>
    }
}

export default EditPage;

