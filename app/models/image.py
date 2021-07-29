from .db import db

class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, unique=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    listing = db.relationship('Listing', back_populates='images')
    
    def __repr__(self):
        return '<Image %r>' % self.image

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'listing_id': self.listing_id
        }