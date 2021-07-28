from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.models import Review

class NewReviewForm(FlaskForm):
    rating = StringField('rating')
    comment = StringField('comment')
    user_id = StringField('user_id')
    listing_id = StringField('listing_id')