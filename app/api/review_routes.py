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