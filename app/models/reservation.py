from .db import db


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    price = db.Column(db.Integer)

    user = db.relationship('User', back_populates='reservations')
    listing = db.relationship('Listing', back_populates='reservations')

    # def __init__(self, user_id, listing_id, start_date, end_date, price):
    #     self.user_id = user_id
    #     self.listing_id = listing_id
    #     self.start_date = start_date
    #     self.end_date = end_date
    #     self.price = price
        
    def __repr__(self):
        return '<Reservation %r>' % self.id

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'price': self.price
        }

