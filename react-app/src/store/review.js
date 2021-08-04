const ADD_REVIEW = 'CREATE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

const removeReview = (review) => ({
    type: DELETE_REVIEW,
    review
});

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
        dispatch(removeReview(reviewId));
    } else {
        throw new Error(response.statusText);
    }
}

export default function Reducer(state={}, action) {
    let newState = {};
    switch (action.type) {
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
            delete newState[action.review];
            return newState;
        default:
            return state;
    }
}

