from app.models import db, Image


def seed_images():
    images = [
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-bowser1.jfif',
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-bowser2.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-bowser3.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-bowser4.jpg'
    ]
    for image in images:
        bowser_castle = Image(
            listing_id=1,
            image=image
    )
        db.session.add(bowser_castle)
        db.session.commit()

    images=[
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-peaches1.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-peach2.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-peach3.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/listing-peach4.jpg'
    ]
    for image in images:
        peach_castle = Image(
            listing_id=2,
            image=image)
        db.session.add(peach_castle)
        db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()