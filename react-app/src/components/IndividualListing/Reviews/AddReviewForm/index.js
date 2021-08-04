import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getListing } from '../../../../store/listing';

import styles from './AddReviewForm.module.css'

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function AddReviewForm() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { listingId } = useParams();
    const listing = useSelector( (state) => state.listing[listingId]);
    console.log('listing from review form', listing)

    // const [ rating, setRating ] = useState(1);
    const [ comment, setComment ] = useState('');
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    
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

    useEffect(() => {
        dispatch(getListing(listingId));
    }, [dispatch, listingId]);

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

    if (listing) {

    return (
        <div className={styles.reviewFormPage}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h3 className={styles.header}>What do you think about {listing.name}?</h3>
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
                            <textarea name="comment" id="comment" className={styles.area}/>
                        </div>
                    </div>
                    <div className={styles.formFooter}>
                        <button className={styles.button} type="submit">Submit</button>
                        <button className={styles.return} onClick={() => history.push("/individual-listing/" + listing.id)}>Return</button>
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

export default AddReviewForm;
