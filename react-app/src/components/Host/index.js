import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUser } from '../../store/session'

function Host() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(getUser(userId));
    }, [userId, dispatch]);

    const user = useSelector(state => state.session.user);
    if (user) {
    if (user.host !== true){
        history.push(`/not-host/${userId}`);
    }}

    // console.log(user)

    return (
        <div className="hostPage">
            <h1>Host</h1>
            <button onClick={() => history.push(`/new-listing/${userId}`)}>Create A New Listing</button>
        </div>
    )
}

export default Host;