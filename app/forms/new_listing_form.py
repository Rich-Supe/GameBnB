from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Listing

class NewListingForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = IntegerField    ('price', validators=[DataRequired()])
    total_bedrooms = IntegerField('total_bedrooms', validators=[DataRequired()])
    total_bathrooms = IntegerField('total_bathrooms', validators=[DataRequired()])
    has_kitchen = BooleanField('has_kitchen')
    has_internet = BooleanField('has_internet')
    sq_ft = IntegerField('sq_ft', validators=[DataRequired()])
    latlang = StringField('latlang')
