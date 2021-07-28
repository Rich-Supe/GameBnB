
from flask import Blueprint, jsonify, request
from app.aws import (upload_file_to_s3, get_unique_filename, allowed_file)
from app.models import db, Image

image_routes = Blueprint('images', __name__)

# get images by listing id
# @images_routes.route('/<int:listing_id>', methods=['GET'])
# def get_images(listing_id):


# create images to append to a listing
@image_routes.route('/<int:listing_id>', methods=['POST'])
def create_images(listing_id):

    images = [request.files[image] for image in request.files]

    for image in images:
        if image and not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
    
    for image in images:
        image.filename = get_unique_filename(image.filename)

    uploads = [upload_file_to_s3(image) for image in images]

    for upload in uploads:
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

    urls = [upload["url"] for upload in uploads]
    # flask_login allows us to get the current user from the request
    for url in urls:
        db.session.add(Image(listing_id=listing_id, url=url))
    # new_image = Image(user=current_user, url=url)
    # db.session.add(new_image)
    db.session.commit()
    return {"urls": urls}
