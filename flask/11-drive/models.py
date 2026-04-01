from datetime import datetime
from flask_login import UserMixin
from extensions import db, bcrypt

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    
    role = db.Column(db.String(100), default='user', nullable=False, index=True)
    quota_bytes = db.Column(db.Integer, nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    files = db.relationship('File', backref='owner', lazy=True)
    
    def set_password(self, password: str) -> None:
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
    def check_password(self, password: str) -> bool:
        return bcrypt.check_password_hash(self.password_hash, password)
    
    @property
    def is_admin(self) -> bool:
        return self.role == 'admin'
    
    @property
    def is_active(self) -> bool:
        return self.active
    
    def __repr__(self) -> str:
        return super().__repr__()