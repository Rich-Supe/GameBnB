# Gamebnb

## For a deeper dive, check the following:
  * MVP - https://github.com/Rich-Supe/GameBnB/wiki/MVP-List
  * User Stories - https://github.com/Rich-Supe/GameBnB/wiki/User-Stories
  * Backend Routes - https://github.com/Rich-Supe/GameBnB/wiki/Backend-API-Routes
  * Frontend Routes - https://github.com/Rich-Supe/GameBnB/wiki/Frontend-Routes
  * Database Schema - https://dbdiagram.io/d/60ff1a4428da596eb54e3281
  * Wireframe - https://wireframepro.mockflow.com/view/gamebnb

 ## Technologies Used

| Back-end    | Front-end |
| ---      | ---       |
| Python3 | JavaScript/HTML/CSS 3  |
| PostgreSQL     | React |
| SQLAlchemy |   Redux(Flux)    |
| Alembic | Google Maps API |
| Docker | SwiperJs |
| AWS S3 |  Heroku(deployment)  |


# Stack Explanation:

### Docker: 
##### While using docker on a small scale app may seem like an unneccesary extravagance at first glance, I found it to be a great learning (and practice) opportunity to learn scalability while implementing the following:
* Dockerfiles
* Images
* Containers

### Redux(with flux architecture): 
##### Similar to Docker, Redux can be easily replaced with other methods such as modern react context. My choice to go with Redux to manage our application's state is simply to continue to learn/practice how to create and maintain scalable applications

### Google Maps Api
*Implementing the map into our app

### AWS S3
* I use S3 buckets primarily for storing all of the images that users add to their listings and their profiles.
* Code example showing workflow from the API route that manages multiple uploads at one time, to the thunk/reducer that manages the state of the application throughout this feature. Basic error handling included.

##### API Route for AWS S3 bucket multiple image storage (in Python, using SQLAlchemy):
```python
@image_routes.route('/<int:listing_id>', methods=['POST'])
def create_images(listing_id):
    images = request.files.getlist('images')

    for image in images:
        if image and not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

    uploads = []
    
    for image in images:
        image.filename = get_unique_filename(image.filename)
        uploads.append(upload_file_to_s3(image))


    for upload in uploads:
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

    urls = [upload["url"] for upload in uploads]
    # flask_login allows us to get the current user from the request
    for url in urls:
        db.session.add(Image(listing_id=listing_id, image=url))
    db.session.commit()
    return {"urls": urls}
```
##### Thunk that will hit the above route and create the listing itself hitting a different API route. This thunk will dispatch the create listing action creator and related reducer (in Javascript):
```javascript
export const createListing = (listing, images, userId) => async (dispatch) => {
    const listingResponse = await fetch(`/api/listings/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });
    
    if (listingResponse.ok) {
        const listing = await listingResponse.json();
        const listingId = listing.id;
        const imageResponse = await fetch(`/api/images/${listingId}`, {
            method: 'POST',
            body: images
        });
        
        if (imageResponse.ok) {
            const newImages = await imageResponse.json();
            const listingImg = { ...listing, newImages };
            dispatch(addListing(listingImg));
            return listingImg;
        };
    };
    else {
        return ['An error occurred. Please try again.']
    };
};
```
