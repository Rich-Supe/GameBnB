import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/Splash/SplashPage';
import Home from './components/Home';
import Listings from './components/Listings';
import Profile from './components/Profile';
import NewListing from './components/NewListing';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';

function App() {
const [loaded, setLoaded] = useState(false);
const dispatch = useDispatch();

useEffect(() => {
    (async() => {
    await dispatch(authenticate());
    setLoaded(true);
    })();
}, [dispatch]);

if (!loaded) {
    return null;
}

return (
    <BrowserRouter>
    <NavBar />
    <Switch>
        <Route path="/" exact={true} >
            <SplashPage />
        </Route>
        <Route path="/home" exact={true}>
            <Home />
        </Route>
        <Route path="/listings">
            <Listings />
        </Route>
        <Route path="/users/:userId">
            <Profile />
        </Route>
        <Route path='/new-listing/:userId'>
            <NewListing />
        </Route>
        {/* <Route path='/login' exact={true}>
        <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
        <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
        <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
        <User />
        </ProtectedRoute> */}
    </Switch>
    </BrowserRouter>
);
}

export default App;
