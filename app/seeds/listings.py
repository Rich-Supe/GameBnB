from app.models import db, Listing

def seed_listings():
    bowsers_castle = Listing(
        name='Bowser\'s Castle',
        user_id=2,
        description='A beautiful and haunting structure, locals believe it to be cursed. Beware of people playing go-karts throughout the hallways and the blue blocks that tend to smash toes. It has plenty of space for all of your largest parties! Do not take pictures on the bowser statue and please do not touch the art. Why was mario furious? He caught Peach going through his Bowser history!',
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
        description='A gorgeous castle, beware of turtles and talking mushrooms. Currently pre-occupied by a man in a red hat fighting a giant turtle. Please DO NOT attempt to jump into paintings. Surrounded with a beautiful mote and accompanying drawbridge.',
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
        description='Your stay will be both timeless and filled with adventure. You know what they say, I Link therefore I am. Please DO NOT touch the chickens, they have a serious attitude.',
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
        description='A beautiful city with inns, werewolves, and a village crazy pretending to be dragonborn walking around shouting at people. Aforementioned person will attempt to pickpocket, so please inform guards if seen! Unrelated, but apparently a dragon\'s roar can be heard in the distance.',
        price=10000,
        total_bedrooms='100',
        total_bathrooms='1',
        sq_ft='200000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71589,-74.00597')
    bilgewater_bay = Listing(
        name='Bilgewater Bay',
        user_id=1,
        description='Bilgewater is a haven for smugglers, marauders, and the unscrupulous, where fortunes are made and ambitions shattered in the blink of an eye. For those fleeing justice, debt, or persecution, it is a city of new beginnings; no one on the twisted streets of Bilgewater cares about your past. It\'s a melting pot of cultures, races, and creeds, alive with activity at all hours. Watch out for fights over crabs, people have died for less.',
        price=2999,
        total_bedrooms='60',
        total_bathrooms='5',
        sq_ft='100000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71589,-74.00597')
    lothric_castle = Listing(
        name='Lothric Castle',
        user_id=1,
        description='A beautiful and mysterious castle, one should tread lightly when walking through it\'s corridors. When in sight, enemies attack ruthlessly, although rolling on the ground is an effective way to travel. Actually, we reccommend that you roll as your only means of travel while staying here.',
        price=5000,
        total_bedrooms='10',
        total_bathrooms='7',
        sq_ft='20000',
        has_kitchen=True,
        has_internet=False,
        latlang='40.71589,-74.00597')

    
    db.session.add(bowsers_castle)
    db.session.add(peaches_castle)
    db.session.add(hyrule_castle)
    db.session.add(whiterun)
    db.session.add(bilgewater_bay)
    db.session.add(lothric_castle)
    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
