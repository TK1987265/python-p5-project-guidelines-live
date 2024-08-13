
from flask import Flask, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db

def create_app(config_name=None):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prowrestling.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate = Migrate(app, db)

  
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    
    @app.after_request
    def after_request(response):
        header = response.headers
        header['Access-Control-Allow-Origin'] = '*'
        header['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        header['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
        header['Access-Control-Allow-Credentials'] = 'true'
        return response

    # Import blueprints
    from routes.wrestlers import wrestlers_bp
    from routes.teams import teams_bp
    from routes.events import events_bp
    from routes.matches import matches_bp

    # Register blueprints
    app.register_blueprint(wrestlers_bp, url_prefix='/wrestlers')
    app.register_blueprint(teams_bp, url_prefix='/teams')
    app.register_blueprint(events_bp, url_prefix='/events')
    app.register_blueprint(matches_bp, url_prefix='/matches')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5555, debug=True)
