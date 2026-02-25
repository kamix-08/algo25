from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100))
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)
    description = db.Column(db.Text)
    cover_art = db.Column(db.String(255))  # Link to cover art
    
class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(50), unique=True)
    user_password = db.Column(db.String(50))
    user_first_name = db.Column(db.String(20))
    user_last_name = db.Column(db.String(30))