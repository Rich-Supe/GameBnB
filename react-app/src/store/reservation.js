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

const deleteReservation = (reservation) => ({
    type: DELETE_RESERVATION,
    reservation
});

export const unloadReservation = () => ({
    type: UNLOAD_RESERVATION
});


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

export default function Reducer(state = {}, action) {
    let newState;
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
        case DELETE_RESERVATION: {};
        case UNLOAD_RESERVATION:
            newState = { ...state };
            return newState;
        default:
            return state;
    }
}