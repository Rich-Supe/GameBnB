
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createListing } from '../../store/listing'
import styles from './NewListing.module.css'
import SimpleModal from '../../assets/javascript/SimpleModal/SimpleModal';

function NewListing(){
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [errors, setErrors] = useState([]);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState(1);
    const [ totalBedrooms, setTotalBedrooms ] = useState(1);
    const [ totalBathrooms, setTotalBathrooms ] = useState(1);
    const [ sqFt, setSqFt ] = useState(1);
    const [ hasKitchen, setHasKitchen ] = useState(false);
    const [ hasInternet, setHasInternet ] = useState(false);
    const [ imageLoading, setImageLoading ] = useState(false);
    const [ currentImages, setCurrentImages ] = useState([]);
    // console.log(errors);
    // console.log("price  :", typeof(parseInt(price), 10), "totalBedrooms:", typeof(totalBedrooms), "totalBathrooms:", totalBathrooms, "sqFt:", sqFt, "hasKitchen:", hasKitchen, "hasInternet:", hasInternet)
    // console.log("CurrentImgarray", currentImages)
    const addImage = (e) => {
        const file = e.target.files[0];
        if (file){
        setCurrentImages((prevVal) => [...prevVal, file])
        }
    }

    //Error handling functions:
    // const handleNameError = (name) => {
    //     const specialChar = /[^a-zA-Z0-9 ]/g;
    //     if (name.length < 1){
    //         setErrors(['Name is required.']);
    //     } else if (name.length > 50){
    //         setErrors(['Name must be less than 50 characters.']);
    //     } else if (specialChar.test(name)){
    //         setErrors(['Name cannot contain special characters.']);
    //     }
    // }

    const onSubmit = async (e) => {
        e.preventDefault();

        //Add errors and push here:
        // handleNameError(name);

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
        // console.log(errors)
        // if (errors.length > 0){
        //     return errors
        // } else {
            // console.log('submitted!', payload, formData, userId)
            const listing = await dispatch(createListing(payload, formData, userId));
            setImageLoading(false);
            if (!Array.isArray(listing)) {
                // console.log('LISTING', listing)
                history.push('/listings')
            }
    };

    const infoHeaderStyles = {
        fontSize: '2em',
        // textShadow: '2px 1px 9px rgba(0, 0, 0, 1)',
        padding: '5px', 
        marginBottom: '5px',
        marginTop: '5px',
        borderBottom: '1px solid black',
    }

    const info = (
        <>
            <h2 id="simple-modal-title" style={infoHeaderStyles}>Images</h2>
                <p id="simple-modal-description">
                    Upload your images to make your listing stand out! Users generally prefer clean pictures
                    to give a good first impression. Upload up to 6 images! Accepts pdf, png, jpg, jpeg, gif, jfif, webp, svg, bmp, tiff and tif.
                </p>
        </>
    );

    return (
        <div className={styles.newListingPage}>
            <h1 className={styles.header}>Create Your New Listing</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formGroup}>  
                <div className={styles.signupFormErrors}>
                    {errors.map((error, ind) => (
                    <div key={ind} className={styles.errors}>{error}</div>
                    ))}
                </div>
                <div className={styles.formName}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className={styles.formInput} id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
            
                <div className={styles.formNums}>
                    <div className={styles.formPrice}>
                    <label htmlFor="price">Price:</label>
                    <input type="number" className={styles.formInputNum} id="price" placeholder="Price" value={price} onChange={(e) => parseInt(setPrice(e.target.value), 10)} required/>
                    </div>
                    <div className={styles.formPrice}>
                    <label htmlFor="sqFt">Square Feet:</label>
                    <input type="number" className={styles.formInputNum} id="sqFt" placeholder="Square Foot" value={sqFt} onChange={(e) => setSqFt(e.target.value)} required/>
                    </div>
                </div>

                <div className={styles.formNums}>
                    <div className={styles.formPrice}>
                    <label htmlFor="totalBedrooms">Total Bedrooms:</label>
                    <input type="number" className={styles.formInputNum} id="totalBedrooms" placeholder="Total Bedrooms" value={totalBedrooms} onChange={(e) => setTotalBedrooms(e.target.value)} required/>
                    </div>
                    <div className={styles.formPrice}>
                    <label htmlFor="totalBathrooms">Total Bathrooms:</label>
                    <input type="number" className={styles.formInputNum} id="totalBathrooms" placeholder="Total Bathrooms" value={totalBathrooms} onChange={(e) => setTotalBathrooms(e.target.value)} required/>
                    </div>
                </div>
                <div className={styles.formCheck}>
                    <div>
                    <label htmlFor="hasKitchen" className={styles.checkLabel}>Has Kitchen:</label>
                    <input type="checkbox" className={styles.formInputCheck} id="hasKitchen" placeholder="Has Kitchen" value={hasKitchen} onChange={() => setHasKitchen(!hasKitchen)} />
                    </div>
                    <div>
                    <label htmlFor="hasInternet" className={styles.checkLabel}>Has Internet:</label>
                    <input type="checkbox" className={styles.formInputCheck} id="hasInternet" placeholder="Has Internet" value={hasInternet} onChange={() => setHasInternet(!hasInternet)} />
                    </div>
                </div>
                <div className={styles.formDescription}>
                    <label htmlFor="description">Description:</label>
                    <textarea className={styles.formInput} id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div className={styles.formImg}>
                    <label htmlFor="images">Upload some images for your guests?</label>
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

export default NewListing;