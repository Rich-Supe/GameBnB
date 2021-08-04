from .db import db
from .user import likes_table

class Listing(db.Model):
    __tablename__ = 'listings'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String, nullable=False)
    total_bedrooms = db.Column(db.Integer, nullable=False)
    total_bathrooms = db.Column(db.Integer, nullable=False)
    has_kitchen = db.Column(db.Boolean, nullable=False)
    has_internet = db.Column(db.Boolean, nullable=False)
    sq_ft = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    latlang = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    images = db.relationship('Image', back_populates='listing')
    reservations = db.relationship('Reservation', back_populates='listing')
    reviews = db.relationship('Review', back_populates='listing')
    user = db.relationship('User', back_populates='listings', lazy=True)
    likes_listing = db.relationship('User', secondary=likes_table, back_populates='likes_user')


    # def __init__(self, name, description, price, user_id, total_bedrooms, total_bathrooms, has_kitchen, has_internet, sq_ft, images, latlang):
    #     self.name = name
    #     self.description = description
    #     self.price = price
    #     self.user_id = user_id
    #     self.total_bedrooms = total_bedrooms
    #     self.total_bathrooms = total_bathrooms
    #     self.has_kitchen = has_kitchen
    #     self.has_internet = has_internet
    #     self.images = images
    #     self.latlang = latlang
    #     self.sq_ft = sq_ft

    def __repr__(self):
        return '<Listing %r>' % self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'total_bedrooms': self.total_bedrooms,
            'total_bathrooms': self.total_bathrooms,
            'has_kitchen': self.has_kitchen,
            'has_internet': self.has_internet,
            'price': self.price,
            'latlang': self.latlang,
            'user_id': self.user_id,
            'sq_ft': self.sq_ft,
            'images': [image.to_dict() for image in self.images],
            'reviews': [review.to_dict() for review in self.reviews], 
        }