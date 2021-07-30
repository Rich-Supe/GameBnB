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
        description='A gorgeous castle, beware of turtles and talking mushrooms. Currently pre-occupied by a man in a red hat fighting a giant turtle.',
        price=1400,
        total_bedrooms='14',
        total_bathrooms='10',
        sq_ft='15000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71523,-74.00573')
    hyrule_castle = Listing(
        name='Hyrule Castle',
        user_id=3,
        description='Your stay will be both timeless and filled with adventure. Please DO NOT touch the chickens, they have a serious attitude.',
        price=5000,
        total_bedrooms='10',
        total_bathrooms='7',
        sq_ft='20000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71589,-74.00597')
    whiterun = Listing(
        name='Whiterun',
        user_id=2,
        description='A beautiful city with inns, werewolves, and a village crazy pretending to be dragonborn walking around shouting at people.',
        price=10000,
        total_bedrooms='100',
        total_bathrooms='1',
        sq_ft='200000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71589,-74.00597')

    
    db.session.add(bowsers_castle)
    db.session.add(peaches_castle)
    db.session.add(hyrule_castle)
    db.session.add(whiterun)
    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
