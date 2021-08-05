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
# @review_routes.route('/listing/<int:listing_id>', methods=['GET'])
# def get_reviews_by_listing_id(listing_id):
#     reviews = Review.query.filter_by(listing_id=listing_id).all()
#     return ([review.to_dict() for review in reviews])

# get all reviews by user id
# @review_routes.route('/user/<int:user_id>', methods=['GET'])
# def get_reviews_by_user_id(user_id):
#     reviews = Review.query.filter_by(user_id=user_id).all()
#     return ([review.to_dict() for review in reviews])

# get a review by id
@review_routes.route('/<int:review_id>', methods=['GET'])
def get_review_by_id(review_id):
    review = Review.query.get(review_id)
    return review.to_dict()

#create a new review
@review_routes.route('/<int:listing_id>', methods=['POST'])
def create_review(listing_id):
    form = NewReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id=form.user_id.data,
            listing_id=listing_id,
            comment=form.comment.data,
            rating=form.rating.data
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# edit a review
@review_routes.route('/<int:review_id>', methods=['PUT'])
def edit_review(review_id):
    form = NewReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(review_id)
        review.user_id = form.user_id.data
        review.listing_id = form.listing_id.data
        review.comment = form.comment.data
        review.rating = form.rating.data
        db.session.commit()
        return review.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete a review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review deleted'}
    else:
        return {'message': 'Review not found'}, 404