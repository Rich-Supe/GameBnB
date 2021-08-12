
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editListing, getListing } from '../../store/listing'
import styles from './EditListing.module.css'
import SimpleModal from '../../assets/javascript/SimpleModal/SimpleModal';

function EditListing(){
    const history = useHistory();
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector( (state) => state.listing[listingId]);
    // console.log("listing:", listing)
    const [errors, setErrors] = useState([]);
    const [ name, setName ] = useState(listing.name);
    const [ description, setDescription ] = useState(listing.description);
    const [ price, setPrice ] = useState(listing.price);
    const [ totalBedrooms, setTotalBedrooms ] = useState(listing.total_bedrooms);
    const [ totalBathrooms, setTotalBathrooms ] = useState(listing.total_bathrooms);
    const [ sqFt, setSqFt ] = useState(listing.sq_ft);
    const [ hasKitchen, setHasKitchen ] = useState(false);
    const [ hasInternet, setHasInternet ] = useState(false);
    const [ imageLoading, setImageLoading ] = useState(false);
    const [ currentImages, setCurrentImages ] = useState([]);


    useEffect(() => {
        dispatch(getListing(listingId))
    }, [dispatch, listingId]);

    const addImage = (e) => {
        const file = e.target.files[0];
        if (file){
        setCurrentImages((prevVal) => [...prevVal, file])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < currentImages.length; i++) {
            formData.append(`images`, currentImages[i]);
        }
        // });
        // for (var key of formData.keys()) {
        //     console.log(key);
        //  }

        setImageLoading(true);

        const payload = {
            name,
            description,
            price: parseInt(price),
            total_bedrooms: parseInt(totalBedrooms),
            total_bathrooms: parseInt(totalBathrooms),
            sq_ft: parseInt(sqFt),
            hasKitchen,
            hasInternet,
        };

        // console.log('submitted!', payload, formData, listingId)
        const listing = await dispatch(editListing(payload, formData, listingId));
        setImageLoading(false);
        if (listing) {
            history.push('/listings')
        }
    };

    const info = (
        <>
            <h2 id="simple-modal-title">Images</h2>
                <p id="simple-modal-description">
                    Upload your images to make your listing stand out! Users generally prefer clean pictures
                    to give a good first impression. Upload up to 6 images! Accepts pdf, png, jpg, jpeg, gif, jfif, webp, svg, bmp, tiff and tif.
                </p>
        </>
    );

    return (
        <div className={styles.newListingPage}>
            <h1 className={styles.header}>Edit {listing.name}</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                <div className={styles.signupFormErrors}>
                    {errors.map((error, ind) => (
                    <div key={ind} className={styles.errors}>{error}</div>
                    ))}
                    </div>
                    <div className={styles.formName}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className={styles.formInput} id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.formNums}>
                        <div className={styles.formPrice}>
                        <label htmlFor="price">Price:</label>
                        <input type="number" className={styles.formInput} id="price" placeholder="Price" value={price} onChange={(e) => parseInt(setPrice(e.target.value), 10)} />
                        </div>
                        <div className={styles.formPrice}>
                        <label htmlFor="sqFt">Square Foot:</label>
                        <input type="number" className={styles.formInput} id="sqFt" placeholder="Square Foot" value={sqFt} onChange={(e) => setSqFt(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.formNums}>
                        <div className={styles.formPrice}>
                        <label htmlFor="totalBedrooms">Total Bedrooms:</label>
                        <input type="number" className={styles.formInput} id="totalBedrooms" placeholder="Total Bedrooms" value={totalBedrooms} onChange={(e) => setTotalBedrooms(e.target.value)} />
                        </div>
                    {/* </div>
                    <div className={styles.formGroup}> */}
                        <div className={styles.formPrice}>
                        <label htmlFor="totalBathrooms">Total Bathrooms:</label>
                        <input type="number" className={styles.formInput} id="totalBathrooms" placeholder="Total Bathrooms" value={totalBathrooms} onChange={(e) => setTotalBathrooms(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.formCheck}>
                        <div>
                        <label htmlFor="hasKitchen">Has Kitchen:</label>
                        <input type="checkbox" className={styles.formInput} id="hasKitchen" placeholder="Has Kitchen" value={hasKitchen} onChange={() => setHasKitchen(!hasKitchen)} />
                        </div>
                        <div>
                        <label htmlFor="hasInternet">Has Internet:</label>
                        <input type="checkbox" className={styles.formInput} id="hasInternet" placeholder="Has Internet" value={hasInternet} onChange={() => setHasInternet(!hasInternet)} />
                        </div>
                    </div>
                    <div className={styles.formDescription}>
                        <label htmlFor="description">Description:</label>
                        <textarea className={styles.formInput} id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className={styles.formImg}>
                        <label htmlFor="images">Upload more images for your guests?</label>
                        <input type="file" className={styles.formInput} id="images" placeholder="Images" onChange={addImage} multiple/>
                        <SimpleModal info={info}/>
                    </div>
                    <div className={styles.formBtn}>
                        <button type="submit" className={styles.button}>Submit</button>
                    </div>
                    {(imageLoading)&& <p>Loading...</p>}
                </div>
            </form>
        </div>
    )
}

export default EditListing;