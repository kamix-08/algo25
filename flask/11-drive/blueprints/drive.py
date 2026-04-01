from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from extensions import db

drive_bp = Blueprint('drive', __name__, url_prefix='/drive')

@drive_bp.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('drive.dashboard'))
    return redirect(url_for('auth.login'))

@drive_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('drive_dashboard.html', title='Dashboard')