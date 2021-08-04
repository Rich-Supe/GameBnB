const SET_RESERVATION = 'SET_RESERVATION';
const SET_RESERVATIONS = 'SET_RESERVATIONS';
const ADD_RESERVATION = 'ADD_RESERVATION';
const UPDATE_RESERVATION = 'UPDATE_RESERVATION';
const DELETE_RESERVATION = 'DELETE_RESERVATION';
const UNLOAD_RESERVATION = 'UNLOAD_RESERVATION';

const setReservation = (reservation) => ({
    type: SET_RESERVATION,
    reservation
});

const setReservations = (reservations) => ({
    type: SET_RESERVATIONS,
    reservations
});

const addReservation = (reservation) => ({
    type: ADD_RESERVATION,
    reservation
});

const updateReservation = (reservation) => ({
    type: UPDATE_RESERVATION,
    reservation
});

const removeReservation = (reservationId) => ({
    type: DELETE_RESERVATION,
    reservationId
});

export const unloadReservation = () => ({
    type: UNLOAD_RESERVATION
});


// get a reservation by id
export const getReservation = (reservationId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/one/${reservationId}`);
    const reservation = await response.json();
    dispatch(setReservation(reservation));
};

// get reservations by user id
export const getAllReservations = (userId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${userId}`)
    const reservations = await response.json();
    dispatch(setReservations(reservations));
};

// create a new reservation
export const createReservation = (reservation) => async (dispatch) => {
    const response = await fetch(`/api/reservations/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    })
    const reservationId = await response.json();
    dispatch(addReservation(reservationId));
}

// update a reservation
export const editReservation = (reservation, reservationId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/edit/${reservationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    })

    if (response.ok) {
        const reservation = await response.json();
        // const reservationId = reservation.id;
        dispatch(updateReservation(reservation));
    }
};

// delete a reservation
export const deleteReservation = (reservationId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/delete/${reservationId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const reservation = await response.json();
        dispatch(removeReservation(reservationId));
        return reservation;
    }
    else {
        throw new Error(response.statusText);
    }
};

export default function Reducer(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case SET_RESERVATION:
            newState = { ...state };
            newState[action.reservation.id] = action.reservation;
            return newState;
        case SET_RESERVATIONS:
            newState = { ...state };
            action.reservations.reservations.forEach((reservation) => {
                newState[reservation.id] = reservation;
            }
            );
            return newState;
        case ADD_RESERVATION:
            newState = { ...state };
            newState[action.reservation.id] = action.reservation;
            return newState;
        case UPDATE_RESERVATION:
            newState = { ...state };
            newState[action.reservation.id] = action.reservation;
            return newState;
        case DELETE_RESERVATION:
            newState = { ...state };
            delete newState[action.reservationId];
            return newState;
        case UNLOAD_RESERVATION:
            // newState = { ...state };
            return { ...newState };
        default:
            return state;
    }
}