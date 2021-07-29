const SET_LISTING = 'listings/SET_LISTING';
const SET_ALL_LISTINGS = 'listings/SET_ALL_LISTINGS';
const ADD_LISTING = 'listings/ADD_LISTING';
const UPDATE_LISTING = 'listings/UPDATE_LISTING';

const setListing = (id) => ({
    type: SET_LISTING,
    id
});

const setAllListings = (listings) => ({
    type: SET_ALL_LISTINGS,
    listings
});

const addListing = (listing) => ({
    type: ADD_LISTING,
    listing
});

const updateListing = (listing) => ({
    type: UPDATE_LISTING,
    listing
});

// all listings
export const getAllListings = () => async (dispatch) => {
    const response = await fetch(`/api/listings/`);
    const listings = await response.json();
    console.log(listings)
    dispatch(setAllListings(listings));
};

// single listing
export const getListing = (id) => async (dispatch) => {
    const response = await fetch(`/api/listings/${id}`);
    const listing = await response.json();
    dispatch(setListing(listing.id));
}

// add listing
export const createListing = (listing, images, userId) => async (dispatch) => {
    console.log("Is this working????", listing)
    const listingResponse = await fetch(`/api/listings/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });

    console.log("listing:::::", listingResponse)
    
    if (listingResponse.ok) {
        const listing = await listingResponse.json();
        const listingId = listing.id;
        const imageResponse = await fetch(`/api/images/${listingId}`, {
            method: 'POST',
            body: images
        });

        console.log("img:::::", imageResponse)
        
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
export const editListing = (listing, listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/update/${listingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });

    if (response.ok) {
        const listing = await response.json();
        dispatch(updateListing(listing));
        return listing;
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export default function Reducer(state = {}, action) {
    let newState
    switch (action.type) {
        case SET_LISTING:
            newState = { ...state };
            newState[action.id] = action.listing;
            return newState;
        case SET_ALL_LISTINGS:
            newState = { ...state };
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
        default:
            return state;
    }
};
