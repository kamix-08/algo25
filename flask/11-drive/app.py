from pathlib import Path
from flask import Flask
from flask_login import current_user

from config import Config
from extensions import db, bcrypt, login_manager, csrf, limiter
from models import User

from blueprints.auth import auth_bp
from blueprints.admin import admin_bp
from blueprints.drive import drive_bp

from flask_talisman import Talisman

def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)

    Path(app.config['DATA_PATH']).mkdir(parents=True, exist_ok=True)
    Path(app.config['STORAGE_ROOT']).mkdir(parents=True, exist_ok=True)
    
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)
    limiter.init_app(app)

    limiter.limit("20/minute")(auth_bp)
    limiter.limit("60/minute")(drive_bp)
    limiter.limit("30/minute")(admin_bp)
    
    Talisman(
        app, 
        content_security_policy={
            'default-src': ["'self'"],
            'script-src': ["'self'", "https://cdn.jsdelivr.net", "unsafe-inline"],
            'style-src': ["'self'", "https://cdn.jsdelivr.net", "unsafe-inline"]
        }
    )
    
    with app.app_context():
        db.create_all()
        
    @login_manager.user_loader
    def load_user(user_id: int):
        return db.session.get(User, user_id)
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(drive_bp)
    app.register_blueprint(admin_bp)
    
    @app.context_processor
    def inject_globals():
        return {'current_user': current_user}
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)