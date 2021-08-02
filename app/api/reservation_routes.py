from flask import Blueprint, jsonify, request
from app.forms import NewReservationForm
from app.models import Reservation, db

reservation_routes = Blueprint('reservations', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#Get all reservations by users id
@reservation_routes.route('/<int:user_id>', methods=['GET'])
def get_reservations_by_user_id(user_id):
    reservations = Reservation.query.filter_by(user_id=user_id).all()
    return {"reservations": [reservation.to_dict() for reservation in reservations]}

# Create a new reservation
@reservation_routes.route('/create', methods=['POST'])
def create_reservation():
    form = NewReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reservation = Reservation(
            user_id = form.user_id.data,
            listing_id = form.listing_id.data,
            start_date = form.start_date.data,
            end_date = form.end_date.data,
            days = form.days.data,
            guests = form.guests.data,
            price = form.price.data
        )
        db.session.add(reservation)
        db.session.commit()
        return reservation.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Update a reservation


# Delete a reservation