from flask import Blueprint, jsonify, request
from app.forms import ListingForm
from app.models import Listing, db

listing_routes = Blueprint('listings', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all listings
@listing_routes.route('/', methods=['GET'])
def get_all_listings():
    listings = Listing.query.all()
    return listings.to_dict()

# Get a single listing
@listing_routes.route('/<int:listing_id>', methods=['GET'])
def get_listing(listing_id):
    listing = Listing.query.get(listing_id)
    return listing.to_dict()

