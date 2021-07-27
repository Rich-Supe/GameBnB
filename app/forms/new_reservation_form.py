from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.models import Reservation

class NewReservationForm(FlaskForm):
    price = StringField('price', validators=[DataRequired()])
    start_date = StringField('start_date', validators=[DataRequired()])
    end_date = StringField('end_date', validators=[DataRequired()])
    user_id = StringField('user_id', validators=[DataRequired()])
    listing_id = StringField('listing_id', validators=[DataRequired()])
    