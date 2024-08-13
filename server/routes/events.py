from flask import Blueprint, request, jsonify
from models import Event, db
from datetime import datetime

events_bp = Blueprint('events', __name__)

@events_bp.route('/', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events]), 200

@events_bp.route('/', methods=['POST'])
def create_event():
    data = request.get_json()
    if not data or 'name' not in data or 'date' not in data:
        return jsonify({'message': 'Missing required data: name or date'}), 400
    event = Event(name=data['name'], date=datetime.strptime(data['date'], '%Y-%m-%d'))
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201
