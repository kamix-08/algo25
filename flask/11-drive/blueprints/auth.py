from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user, login_user
from extensions import db

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login')
def login():
    if current_user.is_authenticated:
        return redirect(url_for('drive.dashboard'))
    return render_template('auth_login.html', title='Login')