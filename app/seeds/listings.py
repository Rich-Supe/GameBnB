from app.models import db, Listing

def seed_listings():
    bowsers_castle = Listing(
        name='Bowsers Castle',
        user_id=2,
        description='Bowsers Castle is a castle in the style of the game, The Legend of Zelda. It is a large, dark, and spooky structure, with a dark, spooky forest surrounding it.',
        price=1999,
        total_bedrooms='20',
        total_bathrooms='13',
        sq_ft='20000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71589,-74.00597')
    peaches_castle = Listing(
        name='Peaches Castle',
        user_id=2,
        description='Peaches Castle is a castle in the style of the game, The Legend of Zelda. Currently pre-occupied by a man in a red hat fighting a giant turtle.',
        price=1400,
        total_bedrooms='14',
        total_bathrooms='10',
        sq_ft='15000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71523,-74.00573')
    
    db.session.add(bowsers_castle)
    db.session.add(peaches_castle)
    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
