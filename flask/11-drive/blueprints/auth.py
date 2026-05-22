from flask import Blueprint, flash, render_template, redirect, url_for, request
from flask_login import login_required, current_user, login_user
from extensions import db
from models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.get('/login')
def login_get():
    if current_user.is_authenticated:
        return redirect(url_for('drive.dashboard'))
    return render_template('auth_login.html', title='Login')

@auth_bp.post('/login')
def login_post():
    if current_user.is_authenticated:
        return redirect(url_for('drive.dashboard'))
    
    email = request.form.get('email')
    password = request.form.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        flash('Błędny email lub hasło')
        return redirect(url_for('auth.login_get'))
    
    if not user.is_active:
        flash('To konto jest zablokowane.')
        return redirect(url_for('auth.login_get'))