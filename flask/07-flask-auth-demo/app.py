from flask import Flask, render_template, redirect, url_for, session, flash
from flask_bs4 import Bootstrap
from flask_wtf import FlaskForm
from wtforms import EmailField, PasswordField, SubmitField
from wtforms.validators import DataRequired
import secrets
import os
import json

app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config['SECRET_KEY'] = secrets.token_urlsafe(32)

USERS_FILE = '!users.json'

def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    
    with open(USERS_FILE, 'r', encoding='UTF-8') as f:
        return json.load(f)
    
def save_users(users):
    with open(USERS_FILE, 'w', encoding='UTF-8') as f:
        json.dump(users, f, ensure_ascii=False, indent=4)

class EmailForm(FlaskForm):
    email = EmailField('Login', validators=[DataRequired()])
    password = PasswordField('Hasło:', validators=[DataRequired()])

class LoginForm(EmailForm):
    submit = SubmitField('Zaloguj się')
    
class RegistrationForm(EmailForm):
    submit = SubmitField('Zarejestruj się')

@app.route('/', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    if login_form.validate_on_submit():
        users = load_users()
        
        user = None
        for u in users:
            if u['email'] == login_form.email.data and u['password'] == login_form.password.data:
                user = u
                break
            
        if user:
            session['user'] = user['email']
            flash('Zalogowano pomyślnie', 'success')
            return redirect(url_for('dashboard'))
        
        flash('Nieprawidłowe dane logowania', 'danger')
        return redirect(url_for('login'))
    
    return render_template('login.html', title='Login', login_form=login_form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    register_form = RegistrationForm()
    if register_form.validate_on_submit():
        users = load_users()
        if any([u['email'] == register_form.email.data for u in users]):
            flash('Użytkownik o takiej nazwie już istnieje', 'warning')
            return redirect(url_for('register'))
        
        new_user = {
            'email': register_form.email.data,
            'password': register_form.password.data
        }
        
        users.append(new_user)
        save_users(users)
        
        flash('Rejestracja zakończona sukcesem! Możesz sie teraz zalogować', 'success')
        return redirect(url_for('login'))    
    
    return render_template('register.html', title='Register', register_form=register_form)

@app.route('/dashboard')
def dashboard():
    user = session.get('user')
    if not user:
        flash('Musisz się zalogować, żeby zobaczyć tę stronę', 'warning')
        return redirect(url_for('login'))
    
    return render_template('dashboard.html', title='Dashboard', user=user)

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('Wylogowano poprawnie', 'success')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)