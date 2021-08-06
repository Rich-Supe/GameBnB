const SET_REVIEW = 'SET_REVIEW';
const ADD_REVIEW = 'CREATE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const setReview = (review) => ({
    type: SET_REVIEW,
    review
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

const removeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

// get a review by id
export const getReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);
    const review = await response.json();
    // console.log('review from thunk:', review);
    dispatch(setReview(review));
};

// create a new review
export const createReview = (review, listingId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${listingId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
    } else {
        throw new Error(response.statusText);
    }
}

// update an existing review
export const editReview = (review, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(updateReview(newReview));
    } else {
        throw new Error(response.statusText);
    }
}

// delete an existing review
export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        // dispatch(removeReview(reviewId));
        console.log("removed delete from review store")
    } else {
        throw new Error(response.statusText);
    }
}

export default function Reducer(state={}, action) {
    let newState = {};
    switch (action.type) {
        case SET_REVIEW:
            newState = { ...state };
            newState.review = action.review;
            return newState;
        case ADD_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        case UPDATE_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = { ...state };
            // console.log("State from reducer", newState)
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

