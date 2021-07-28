from flask import Blueprint, jsonify, request
from app.forms import NewReviewForm
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#  get all reviews by listing id
@review_routes.route('/listing/<int:listing_id>', methods=['GET'])
def get_reviews_by_listing_id(listing_id):
    reviews = Review.query.filter_by(listing_id=listing_id).all()
    return ([review.to_dict() for review in reviews])

# get all reviews by user id
@review_routes.route('/user/<int:user_id>', methods=['GET'])
def get_reviews_by_user_id(user_id):
    reviews = Review.query.filter_by(user_id=user_id).all()
    return ([review.to_dict() for review in reviews])