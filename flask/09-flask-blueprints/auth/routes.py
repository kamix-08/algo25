from flask import Blueprint, render_template, redirect, url_for
from .forms import LoginForm, RegistrationForm

auth_bp = Blueprint('auth', __name__, template_folder='templates')

@auth_bp.route('/', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    
    return render_template('login.html', title='Login', login_form=login_form)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    register_form = RegistrationForm()

    return render_template('register.html', title='Register', register_form=register_form)

@auth_bp.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', title='Dashboard')

@auth_bp.route('/logout')
def logout():
    return redirect(url_for('auth.login'))