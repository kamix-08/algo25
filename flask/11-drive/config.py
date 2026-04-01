import os
from pathlib import Path
import secrets

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', secrets.token_urlsafe(64))
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    DATA_DIR = os.path.join(BASE_DIR, 'data')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(DATA_DIR, 'drive.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    MAX_CONTENT_LENGTH = int(os.environ.get('MAX_CONTENT_LENGTH', 200 * 1024 * 1024))
    
    DATA_PATH = Path(os.environ.get('FLASK_DATA_PATH', DATA_DIR)).resolve()
    STORAGE_ROOT = DATA_PATH / 'storage'
    
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    SESSION_COOKIE_SECURE = bool(os.environ.get('SESSION_COOKIE_SECURE', '0'))
    
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_SAMESITE = 'Lax'
    REMEMBER_COOKIE_SECURE = bool(os.environ.get('REMEMBER_COOKIE_SECURE', '0'))
    
    WTF_CSRF_TIME_LIMIT = 3600
    
    SETUP_TOKEN = os.environ.get('SETUP_TOKEN', '')