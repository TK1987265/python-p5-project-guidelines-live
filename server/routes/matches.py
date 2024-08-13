from flask import Blueprint, request, jsonify
from models import Match, db

matches_bp = Blueprint('matches', __name__)

@matches_bp.route('/', methods=['GET'])
def get_matches():
    matches = Match.query.all()
    return jsonify([match.to_dict() for match in matches]), 200

@matches_bp.route('/', methods=['POST'])
def create_match():
    data = request.get_json()
    if not data or 'description' not in data or 'event_id' not in data:
        return jsonify({'message': 'Missing required data: description or event_id'}), 400
    match = Match(description=data['description'], event_id=data['event_id'])
    db.session.add(match)
    db.session.commit()
    return jsonify(match.to_dict()), 201
