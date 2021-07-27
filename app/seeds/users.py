from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', biography='Demo user')
    bowser = User(
        username='Bowser', email='marnie@aa.io', password='password', biography='Real estate mogul and princess kidnapper', host=True)
    zelda = User(
        username='zelda', email='bobbie@aa.io', password='password', biography='Half princess, half warrior, full-time property manager', host=True)

    db.session.add(demo)
    db.session.add(bowser)
    db.session.add(zelda)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
