import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/Splash/SplashPage';
import Home from './components/Home';
import Listings from './components/Listings';
import Profile from './components/Profile';
import NewListing from './components/NewListing';
import EditListing from './components/EditListing';
import EditReservation from './components/EditReservation';
import AddReviewForm from './components/IndividualListing/Reviews/AddReviewForm';
import EditReviewForm from './components/IndividualListing/Reviews/EditReviewForm';
import Host from './components/Host';
import NotHost from './components/Host/NotHost';
import IndividualListing from './components/IndividualListing';
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
        <Route path="/listings" exact={true}>
            <Listings />
        </Route>
        <Route path="/users/:userId">
            <Profile />
        </Route>
        <Route path="/host/:userId">
            <Host />
        </Route>
        <Route path='/new-listing/:userId'>
            <NewListing />
        </Route>
        <Route path='/edit-listing/:listingId'>
            <EditListing />
        </Route>
        <Route path='/edit-reservation/:reservationId'>
            <EditReservation />
        </Route>
        <Route path='/edit-review/:listingId'>
            <EditReviewForm />
        </Route>
        <Route path='/add-review/:listingId'>
            <AddReviewForm />
        </Route>
        <Route path="/not-host/:userId">
            <NotHost />
        </Route>
        <Route path="/individual-listing/:listingId">
            <IndividualListing />
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
