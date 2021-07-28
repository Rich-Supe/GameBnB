from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Listing

class NewListingForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = StringField('price', validators=[DataRequired()])
    total_bedrooms = StringField('total_bedrooms', validators=[DataRequired()])
    total_bathrooms = StringField('total_bathrooms', validators=[DataRequired()])
    has_kitchen = StringField('has_kitchen', validators=[DataRequired()])
    has_internet = StringField('has_internet', validators=[DataRequired()])
    sq_ft = StringField('sq_ft', validators=[DataRequired()])
    images = StringField('images', validators=[DataRequired()])
    user_id = StringField('user_id', validators=[DataRequired()])
    latlang = StringField('latlang', validators=[DataRequired()])
