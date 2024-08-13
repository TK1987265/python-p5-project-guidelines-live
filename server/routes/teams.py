from flask import Blueprint, request, jsonify
from models import Team, db

teams_bp = Blueprint('teams', __name__)

@teams_bp.route('/', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    return jsonify([team.to_dict() for team in teams]), 200

@teams_bp.route('/', methods=['POST'])
def create_team():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'message': 'Missing required data: name'}), 400
    team = Team(name=data['name'])
    db.session.add(team)
    db.session.commit()
    return jsonify(team.to_dict()), 201
