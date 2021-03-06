// constants
const SET_USER = 'session/SET_USER';
const GET_USER = 'session/GET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const setUserId = (id) => ({
    type: GET_USER,
    payload: id
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const getUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);
    if (response.ok) {
        const user = await response.json();
        dispatch(setUserId(user));
    }
    else {
        return [404, 'User not found'];
    }
}


export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
        'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(removeUser());
    }
    };


export const signUp = (name, username, email, password, host) => async (dispatch) => {
    // console.log(name, username, email, password, host)
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name,
        username,
        email,
        password,
        host,
        }),
});

if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
} else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
    return data.errors;
    }
} else {
    return ['An error occurred. Please try again.']
}
}

export default function reducer(state = initialState, action) {
switch (action.type) {
    case SET_USER:
    return { user: action.payload }
    case REMOVE_USER:
    return { user: null }
    default:
    return state;
}
}
