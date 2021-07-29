
import { useHistory, useParams } from 'react-router-dom';

function Host() {
    const history = useHistory();
    const { userId } = useParams();

    const handleCreateNewListing = () => {
        // e.preventDefault();
        history.push(`/listings/new/${userId}`);
    };

    return (
        <div className="hostPage">
            <h1>Host</h1>
            <button onClick={() => history.push(`/new-listing/${userId}`)}>Create A New Listing</button>
        </div>
    )
}

export default Host;