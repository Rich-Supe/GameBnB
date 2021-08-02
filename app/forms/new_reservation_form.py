from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

from app.models import Reservation

class NewReservationForm(FlaskForm):
    price = IntegerField('price', validators=[DataRequired()])
    start_date = StringField('start_date', validators=[DataRequired()])
    end_date = StringField('end_date', validators=[DataRequired()])
    days = IntegerField('days', validators=[DataRequired()])
    guests = IntegerField('guests', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    listing_id = IntegerField('listing_id', validators=[DataRequired()])
    