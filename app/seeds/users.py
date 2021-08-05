from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', biography='Welcome to GameBnb Demo User! Grab your listing cube on the left or reservations on the right to filter through them and edit or delete them! Navigate to the listings page and plan your next exciting adventure! If you would rather host someone elses adventure, click on Hosting in the navbar to get started! GLHF!', host=True)
    bowser = User(
        username='Bowser', email='marnie@aa.io', password='password', biography='Real estate mogul and princess kidnapper', host=True)
    zelda = User(
        username='Zelda', email='bobbie@aa.io', password='password', biography='Half princess, half warrior, full-time property manager', host=True)

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
