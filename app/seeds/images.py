from app.models import db, Image


def seed_images():
    images = [
        'https://gamebnb.s3.us-east-2.amazonaws.com/b23b011e12d24cb79d73e1b2a635d9c6.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/fe65103f34e34d0394a858589d122f4d.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/f952db6b485a4fecbba42cdb0c3497ac.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/8a8b79485a824fe79f11ea51953531e0.jfif'
    ]
    for image in images:
        bowser_castle = Image(
            listing_id=1,
            image=image
    )
        db.session.add(bowser_castle)
        db.session.commit()

    images=[
        'https://gamebnb.s3.us-east-2.amazonaws.com/f7c462cfb98942de9e47da079f60be00.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/3dc6fd77b11e4c9f9efdd4464d1aac13.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/694d705bce764019811f072a79ec0b33.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/ae77edd3b8744ae9ba45383e6cfdeade.jpg'
    ]
    for image in images:
        peach_castle = Image(
            listing_id=2,
            image=image)
        db.session.add(peach_castle)
        db.session.commit()
    
    images=[
        'https://gamebnb.s3.us-east-2.amazonaws.com/d0a7ec69b96c445f898c566f98fc5663.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/65fc5f9db06e4ee9b336291d3f7420a3.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/bbc5069ddb5e4cc18c69bc989b9d24cc.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/16fe061270e443c9b5c16f2d43ecb8da.png'
    ]
    for image in images:
        hyrule_castle = Image(
            listing_id=3,
            image=image)
        db.session.add(hyrule_castle)
        db.session.commit()
    
    images=[
        'https://gamebnb.s3.us-east-2.amazonaws.com/e401bd0acf71400597dc9d8258446f77.png',
        'https://gamebnb.s3.us-east-2.amazonaws.com/f33b37794f10486da50d66141e0e956f.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/8437844a994e4ffa8feeb4172f5b6349.jpg',
        'https://gamebnb.s3.us-east-2.amazonaws.com/0aa7ec6e5a0744adab8ff60c424a0a02.jpg'
    ]
    for image in images:
        whiterun = Image(
            listing_id=4,
            image=image)
        db.session.add(whiterun)
        db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()