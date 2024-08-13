from flask import Blueprint, request, jsonify
from models import Wrestler, Team, db

wrestlers_bp = Blueprint('wrestlers', __name__)

def create_tables():
    db.create_all()

@wrestlers_bp.route('/', methods=['POST'])
def create_wrestler():
    data = request.get_json()
    if not data or 'name' not in data or not data['name'] or 'team_id' not in data:
        return jsonify({'message': 'Missing required wrestler name or team ID'}), 400
    team = Team.query.get(data['team_id'])
    if not team:
        return jsonify({'message': 'Team not found'}), 404
    new_wrestler = Wrestler(
        name=data['name'],
        age=data.get('age'),
        team_id=team.id,
        profile_image_url=data.get('profile_image_url')
    )
    db.session.add(new_wrestler)
    db.session.commit()
    return jsonify({
        'id': new_wrestler.id,
        'name': new_wrestler.name,
        'age': new_wrestler.age,
        'team_id': new_wrestler.team_id,
        'profile_image_url': new_wrestler.profile_image_url
    }), 201

@wrestlers_bp.route('/', methods=['GET'])
def get_wrestlers():
    wrestlers = Wrestler.query.all()
    return jsonify([{
        'id': wrestler.id,
        'name': wrestler.name,
        'age': wrestler.age,
        'team_id': wrestler.team_id,
        'profile_image_url': wrestler.profile_image_url
    } for wrestler in wrestlers])

@wrestlers_bp.route('/<int:id>', methods=['GET'])
def get_wrestler(id):
    wrestler = Wrestler.query.get_or_404(id)
    return jsonify({
        'id': wrestler.id,
        'name': wrestler.name,
        'age': wrestler.age,
        'team_id': wrestler.team_id,
        'profile_image_url': wrestler.profile_image_url
    })

@wrestlers_bp.route('/<int:id>', methods=['PUT'])
def update_wrestler(id):
    wrestler = Wrestler.query.get_or_404(id)
    data = request.get_json()
    if 'name' in data:
        wrestler.name = data['name']
    if 'age' in data:
        wrestler.age = data['age']
    if 'profile_image_url' in data:
        wrestler.profile_image_url = data['profile_image_url']
    if 'team_id' in data:
        team = Team.query.get(data['team_id'])
        if team:
            wrestler.team_id = team.id
        else:
            return jsonify({'message': 'Team not found'}), 404
    db.session.commit()
    return jsonify({
        'id': wrestler.id,
        'name': wrestler.name,
        'age': wrestler.age,
        'team_id': wrestler.team_id,
        'profile_image_url': wrestler.profile_image_url
    })

@wrestlers_bp.route('/<int:id>', methods=['DELETE'])
def delete_wrestler(id):
    wrestler = Wrestler.query.get_or_404(id)
    db.session.delete(wrestler)
    db.session.commit()
    return jsonify({'message': 'Wrestler deleted'})

if __name__ == '__main__':
    app.run(debug=True)
