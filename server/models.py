from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Wrestler(db.Model):
    __tablename__ = 'wrestlers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    profile_image_url = db.Column(db.String)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    events = db.relationship('Event', secondary='event_participation', back_populates='wrestlers')
    matches = db.relationship('Match', secondary='match_participation', back_populates='wrestlers')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'team_id': self.team_id,
            'profile_image_url': self.profile_image_url,
            'event_ids': [event.id for event in self.events],
            'match_ids': [match.id for match in self.matches]
        }

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    wrestlers = db.relationship('Wrestler', backref='team')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'wrestlers': [wrestler.to_dict() for wrestler in self.wrestlers]
        }

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    wrestlers = db.relationship('Wrestler', secondary='event_participation', back_populates='events')
    matches = db.relationship('Match', backref='event')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date.isoformat(),
            'matches': [match.to_dict() for match in self.matches]
        }

class Match(db.Model):
    __tablename__ = 'matches'
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    description = db.Column(db.String(255))
    wrestlers = db.relationship('Wrestler', secondary='match_participation', back_populates='matches')

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'description': self.description,
            'wrestlers': [wrestler.to_dict() for wrestler in self.wrestlers]
        }

class EventParticipation(db.Model):
    __tablename__ = 'event_participation'
    wrestler_id = db.Column(db.Integer, db.ForeignKey('wrestlers.id'), primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)

class MatchParticipation(db.Model):
    __tablename__ = 'match_participation'
    wrestler_id = db.Column(db.Integer, db.ForeignKey('wrestlers.id'), primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey('matches.id'), primary_key=True)
