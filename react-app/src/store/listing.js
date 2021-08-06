const SET_LISTING = 'listings/SET_LISTING';
const SET_ALL_LISTINGS = 'listings/SET_ALL_LISTINGS';
// const SET_ALL_LISTINGS_USER = 'listings/SET_ALL_LISTINGS_USER';
const ADD_LISTING = 'listings/ADD_LISTING';
const UPDATE_LISTING = 'listings/UPDATE_LISTING';
const DELETE_LISTING = 'listings/DELETE_LISTING';
const UNLOAD_LISTING = 'listings/UNLOAD_LISTING';
const UNLOAD_LISTINGS = 'listings/UNLOAD_LISTINGS';
const DELETE_REVIEW_FROM_LISTING = 'listings/DELETE_REVIEW_FROM_LISTING';

const setListing = (listing) => ({
    type: SET_LISTING,
    listing
});

const setAllListings = (listings) => ({
    type: SET_ALL_LISTINGS,
    listings
});

// const setAllListingsUser = (listings) => ({
//     type: SET_ALL_LISTINGS_USER,
//     listings
// });

const addListing = (listing) => ({
    type: ADD_LISTING,
    listing
});

const updateListing = (listing) => ({
    type: UPDATE_LISTING,
    listing
});

const removeListing = (listingId) => ({
    type: DELETE_LISTING,
    listingId
});

export const unloadListing = () => ({
    type: UNLOAD_LISTING,
});

export const unloadListings = () => ({
    type: UNLOAD_LISTINGS,
});

export const removeReviewFromListing = (reviewId, listingId) => ({
    type: DELETE_REVIEW_FROM_LISTING,
    listingId,
    reviewId,
});



// all listings
export const getAllListings = () => async (dispatch) => {
    const response = await fetch(`/api/listings/`);
    const listings = await response.json();
    // console.log(listings)
    dispatch(setAllListings(listings));
};

// single listing
export const getListing = (id) => async (dispatch) => {
    const response = await fetch(`/api/listings/${id}`);
    const listing = await response.json();
    // console.log("listing in thunk:", listing)
    dispatch(setListing(listing));
}

// all listings for user
export const getAllListingsUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/listings/user/${userId}`);
    const listings = await response.json();
    dispatch(setAllListings(listings));
};

// add listing
export const createListing = (listing, images, userId) => async (dispatch) => {
    const listingResponse = await fetch(`/api/listings/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });
    
    if (listingResponse.ok) {
        const listing = await listingResponse.json();
        const listingId = listing.id;
        const imageResponse = await fetch(`/api/images/${listingId}`, {
            method: 'POST',
            body: images
        });
        
        if (imageResponse.ok) {
            const newImages = await imageResponse.json();
            const listingImg = { ...listing, newImages };
            dispatch(addListing(listingImg));
            return listingImg;
        }
    }
    else {
        return ['An error occurred. Please try again.']
    }
};

// edit a listing
export const editListing = (listing, images, listingId) => async (dispatch) => {
    const listingResponse = await fetch(`/api/listings/update/${listingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });

    if (listingResponse.ok) {
        const listing = await listingResponse.json();
        const listingId = listing.id;
        const imageResponse = await fetch(`/api/images/${listingId}`, {
            method: 'POST',
            body: images
        });

        if (imageResponse.ok) {
            const newImages = await imageResponse.json();
            const listingImg = { ...listing, newImages };
            dispatch(updateListing(listingImg));
            return listingImg; 
        }
        else {
            return ['An error occurred. Please try again.']
        }
    }
}

// delete a listing
export const deleteListing = (listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/delete/${listingId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const listing = await response.json();
        dispatch(removeListing(listingId));
        return listing;
    }
    else {
        return ['An error occurred. Please try again.']
    }
};

// Delete review from specific listing.



// export const unloadAListing = (listingId) => async (dispatch) => {
//     return "unloaded!"
// }

export default function Reducer(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case SET_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState;
            // return action.listing;
        case SET_ALL_LISTINGS:
            // newState = { ...state };
            action.listings.listings.forEach((listing) => {
                newState[listing.id] = listing;
            }
            );
            return newState;
        case ADD_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState;
        case UPDATE_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState;
        case DELETE_LISTING:
            // console.log('listing delete reducer:', action.listing)
            newState = { ...state };
            delete newState[action.listingId];
            return newState;
        case UNLOAD_LISTING:
            // newState = { ...state };
            return { ...newState };
        case UNLOAD_LISTINGS:
            return { ...newState };
        case DELETE_REVIEW_FROM_LISTING:
            newState = { ...state };
            const indexOfReview = action.listingId.reviews.indexOf(action.listingId.reviews.find(review => review.id === action.reviewId));
            const removed = action.listingId.reviews.splice(indexOfReview, 1)
            // console.log('removed:', removed)
            // console.log("reducer breakdown, the review:", action.listingId.reviews)
            // console.log("reducer breakdown, index of the review:", indexOfReview)
            // console.log("reducer delete attempt:", action.listingId.reviews.splice(indexOfReview, 1))
            // const removed = newState[action.listingId.reviews.splice(indexOfReview, 1)]
            // console.log("reducer delete attempt, the removed:", removed)
            // console.log("reducer delete attempt, the removed:", removed)
            // delete newState[action.listingId.reviews[indexOfReview]];
            // delete newState[action.listingId.reviews[action.listingId.reviews.indexOf(action.listingId.reviews.comment.id === action.reviewId)].action.reviewId];
            return newState;
        default:
            return state;
    }
};
