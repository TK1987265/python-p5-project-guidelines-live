from app import create_app, db
from models import Wrestler, Team, Event, Match
from datetime import datetime

def seed_data():
    db.drop_all()
    db.create_all()

    # Teams
    team1 = Team(name="Team Alpha")
    team2 = Team(name="Team Omega")
    team3 = Team(name="Team Delta")  # Added a third team

    # Wrestlers
    wrestler1 = Wrestler(name="John Cena", age=42, team=team1, profile_image_url="https://th.bing.com/th/id/R.21c224db3527303415790c70d57076fb?rik=G3SqaQbOVMNtpg&riu=http%3a%2f%2f4.bp.blogspot.com%2f_9oee5Pu6fO0%2fTKLpR70sx1I%2fAAAAAAAAAGY%2feYrU66b8sbU%2fs1600%2f1.jpg&ehk=AnZ0Nj9k534qts8Z%2fMeHqGInoBfJmoWEPKXTNa93OsY%3d&risl=&pid=ImgRaw&r=0")
    wrestler2 = Wrestler(name="The Undertaker", age=55, team=team2, profile_image_url="https://th.bing.com/th/id/R.ebaca1724189f25873fdd44bad807f41?rik=ea3UHe7gSIY3cg&pid=ImgRaw&r=0")
    wrestler3 = Wrestler(name="Triple H", age=51, team=team2, profile_image_url="https://cdn-wp.thesportsrush.com/2021/04/71dd1bc1-does-triple-h-still-have-a-performers-contract-with-the-wwe.png")
    wrestler4 = Wrestler(name="Stone Cold", age=56, team=team3, profile_image_url="https://www.ewrestlingnews.com/wp-content/uploads/2022/02/210416-stone-cold-steve-austin-wwe-ac-845p-scaled-1.jpg")
    wrestler5 = Wrestler(name="Hulk Hogan", age=67, team=team3, profile_image_url="https://i.ebayimg.com/images/g/bjoAAOSwdndmODsH/s-l1600.webp")

    # Events
    event1 = Event(name="WrestleMania", date=datetime(2024, 4, 5))
    event2 = Event(name="Summer Slam", date=datetime(2024, 8, 23))

    # Matches
    match1 = Match(description="Championship Match", event=event1)
    match2 = Match(description="Tag Team Match", event=event2)

    # Assigning Wrestlers to Matches
    match1.wrestlers.append(wrestler1)
    match2.wrestlers.append(wrestler1)
    match2.wrestlers.append(wrestler2)

    # Adding all to the database
    db.session.add_all([team1, team2, team3, wrestler1, wrestler2, wrestler3, wrestler4, wrestler5, event1, event2, match1, match2])
    db.session.commit()

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        seed_data()
