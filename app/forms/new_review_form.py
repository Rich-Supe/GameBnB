from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

from app.models import Review

class NewReviewForm(FlaskForm):
    rating = IntegerField('rating')
    comment = StringField('comment')
    user_id = IntegerField('user_id')
    listing_id = IntegerField('listing_id')