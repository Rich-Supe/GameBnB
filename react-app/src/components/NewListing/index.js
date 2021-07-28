
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './NewListing.module.css'

function NewListing(){
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useParams();

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ totalBedrooms, setTotalBedrooms ] = useState('');
    const [ totalBathrooms, setTotalBathrooms ] = useState('');
    const [ sqFt, setSqFt ] = useState('');
    const [ hasKitchen, setHasKitchen ] = useState('');
    const [ hasInternet, setHasInternet ] = useState('');
    const [ imageLoading, setImageLoading ] = useState(false);

    const currentImages = [];
    
    const addImage = (e) => {
        const file = e.target.files[0];
        currentImages.push(file)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        currentImages.forEach((image) => {
            formData.append('images', image);
        });

        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/images");
        }

        else {
            setImageLoading(false);
            console.log("error");
        }

        const payload = {
            userId,
            name,
            description,
            price,
            totalBedrooms,
            totalBathrooms,
            sqFt,
            hasKitchen,
            hasInternet,
        };

        // const listing = await dispatch(createListing(payload));
        console.log('submitted!', payload)
        // if (listing) {
        //     history.push('/listings')
        // }
    };

    return (
        <div className={styles.newListingPage}>
            <h2>New Listing</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className={styles.formInput} id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Price:</label>
                    <input type="number" className={styles.formInput} id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="totalBedrooms">Total Bedrooms:</label>
                    <input type="number" className={styles.formInput} id="totalBedrooms" placeholder="Total Bedrooms" value={totalBedrooms} onChange={(e) => setTotalBedrooms(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="totalBathrooms">Total Bathrooms:</label>
                    <input type="number" className={styles.formInput} id="totalBathrooms" placeholder="Total Bathrooms" value={totalBathrooms} onChange={(e) => setTotalBathrooms(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="sqFt">Square Foot:</label>
                    <input type="number" className={styles.formInput} id="sqFt" placeholder="Square Foot" value={sqFt} onChange={(e) => setSqFt(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="hasKitchen">Has Kitchen:</label>
                    <input type="checkbox" className={styles.formInput} id="hasKitchen" placeholder="Has Kitchen" value={hasKitchen} onChange={(e) => setHasKitchen(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="hasInternet">Has Internet:</label>
                    <input type="checkbox" className={styles.formInput} id="hasInternet" placeholder="Has Internet" value={hasInternet} onChange={(e) => setHasInternet(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea className={styles.formInput} id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="images">Upload some images for your guests?</label>
                    <input type="file" className={styles.formInput} id="images" placeholder="Images" onChange={addImage} multiple/>
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.button}>Submit</button>
                </div>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default NewListing;