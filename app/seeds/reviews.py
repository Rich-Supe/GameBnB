from app.models import db, Review

def seed_reviews():
    reviews = [
        'Great Place to stay! Bowser was very pleasent, his servants provide meals every morning and evening. Definitely willing to book again!',
        'We had so much Fun! I booked for my grandson\'s birthday party for a weekend getaway with 20 people. The Go Kart racing is incredible!',
        'The kart racing alone is definitely worth the price tag! Bowser holds a medal ceremony after every tournament, you don\'t want to miss out!',
        'Loved this place! Held my bachelors party here with about 10 people and was not disappointed! Do watch out for the traps though, and bring a flashlite if you walk around at night.',
    ]
    for review in reviews:
        bowser_castle = Review(
            listing_id=1,
            user_id=2,
            comment=review,
            rating=5,
        )
        db.session.add(bowser_castle)
        db.session.commit()

    reviews = [
        'Very cute and stylistic place! A bunch of paintings were torn as though someone had been thrown into them or something though...',
        'Love the lighting here! The stain glass makes the sunrise an incredible experience. We got in trouble trying to fish off the drawbridge.',
        'BEWARE of a turtle riding clouds, this guy throws hammers and buckets down from above. The police are apparently still after him.',
        'A quiet and secluded get-away, you don\'t want to miss out! I love listening to the italian guy in red sing songs at the window to get the hosts attention, he has a beautiful voice.',
    ]
    for review in reviews:
        peach_castle = Review(
            listing_id=2,
            user_id=1,
            comment=review,
            rating=4,
        )
        db.session.add(peach_castle)
        db.session.commit()

    reviews = [
        'They were right about the chickens, we had to grab an ambulance for my uncle after he tried to kick one. He was the least favorite so the stay was enjoyable nonetheless.',
        'The host wasn\'t home much, she was usually off with her boyfriend. The kept playing with this weird looking shell and pretending like they could travel through time.',
        'Plenty of activities around the area! Some guy name Ganandorf just couldn\'t get over the fact that he was dumped and ruined our parties with his excessive wailing.',
        'Pretty nice place, although I prefer the go karts at bowser\'s castle.',
    ]
    for review in reviews:
        hyrule_castle = Review(
            listing_id=3,
            user_id=1,
            comment=review,
            rating=5,
        )
        db.session.add(hyrule_castle)
        db.session.commit()
    
    reviews = [
        'They weren\'t joking about this dragonborn guy, he has some serious issues. He kept jumping up and down mumbling about his athletics skill increasing... pretty sure he is stuck in the wrong game or something.',
        'Was a ton of fun! I joined a pub called the companions, they really love their dogs! One was obsessed with vampires, not sure if someone should tell him to lay off Twilight.',
        'The place was really peaceful until I took an arrow to the knee.',
        'Great place! Although this guy Nazeem is a pain and can\'t seem to get the picture that nobody likes him.',
    ]
    for review in reviews:
        whiterun = Review(
            listing_id=4,
            user_id=1,
            comment=review,
            rating=4,
        )
        db.session.add(whiterun)
        db.session.commit()
    
    reviews = [
        'So much Fun! What a great place to stay, I love the people here! A few downers won\'t stop mumbling about some person called OP and getting buffed or something.',
        'More safe than it seems! The people here come from every background! They are really obsessed with this one game about puppets though.',
        'Stay close to the housing! The waters in the surrounding area can be pretty treacherous.',
        'Amazing place! I love the view  from the docks, especially around sunset. There was a really sad mummy that was a bit of a downer though.',
    ]
    for review in reviews:
        bilgewater_bay = Review(
            listing_id=5,
            user_id=1,
            comment=review,
            rating=5,
        )
        db.session.add(bilgewater_bay)
        db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
