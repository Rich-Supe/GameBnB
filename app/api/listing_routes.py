from flask import Blueprint, jsonify, request
from app.forms import NewListingForm
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
    # print("all listings:::::::::::", listings)
    return {"listings": [listing.to_dict() for listing in listings]}

# Get a single listing
@listing_routes.route('/<int:listing_id>', methods=['GET'])
def get_listing(listing_id):
    listing = Listing.query.get(listing_id)
    return listing.to_dict()

# Get all listings that belong to a user
@listing_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user_listings(user_id):
    listings = Listing.query.filter_by(user_id=user_id).all()
    return {"listings": [listing.to_dict() for listing in listings]}

# Create a new listing
@listing_routes.route('/create/<int:user_id>', methods=['POST'])
def create_listing(user_id):
    form = NewListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        listing = Listing(
            user_id=user_id,
            name=form.name.data,
            description=form.description.data,
            price=form.price.data,
            total_bedrooms=form.total_bedrooms.data,
            total_bathrooms=form.total_bathrooms.data,
            sq_ft=form.sq_ft.data,
            has_kitchen=form.has_kitchen.data,
            has_internet=form.has_internet.data,
            latlang=form.latlang.data,)
        db.session.add(listing)
        db.session.commit()
        return listing.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Update a listing
@listing_routes.route('/update/<int:listing_id>', methods=['PUT'])
def update_listing(listing_id):
    form = NewListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        listing = Listing.query.get(listing_id)
        listing.name = form.name.data
        listing.description = form.description.data
        listing.price = form.price.data
        listing.total_bedrooms = form.total_bedrooms.data
        listing.total_bathrooms = form.total_bathrooms.data
        listing.sq_ft = form.sq_ft.data
        listing.has_kitchen = form.has_kitchen.data
        listing.has_internet = form.has_internet.data
        listing.latlang = form.latlang.data
        listing.user_id = form.user_id.data
        db.session.commit()
        return listing.to_dict()
    else:
        return {"Errors", validation_errors_to_error_messages(form.errors)}, 400

# delete a listing
@listing_routes.route('/delete/<int:listing_id>', methods=['DELETE'])
def delete_listing(listing_id):
    print("listingid------------=-=-=--==--=-=", listing_id)
    listing = Listing.query.get(listing_id)
    print("listing------------=-=-=--==--=-=", listing)
    db.session.delete(listing)
    db.session.commit()
    return {"message": "Listing deleted"};


