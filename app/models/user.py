from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

likes_table = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('listing_id', db.Integer, db.ForeignKey('listings.id'), primary_key=True)
)    
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String, nullable=True)
    profile_image = db.Column(db.String, nullable=True)
    host = db.Column(db.Boolean, nullable=True)

    reservations = db.relationship('Reservation', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')
    listings = db.relationship('Listing', back_populates='user')
    likes_user = db.relationship('Listing', secondary=likes_table, back_populates='likes_listing')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'host': self.host,
            'profile_image': self.profile_image,
            'biography': self.biography,
        }

