from flask import Flask, render_template, redirect, url_for, session, flash
from flask_bs4 import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
import secrets

VALID_USERNAME = 'admin'
VALID_PASSWORD = 'zaq1@WSX'

class LoginForm(FlaskForm):
    username = StringField('Login', validators=[DataRequired()])
    password = PasswordField('Hasło:', validators=[DataRequired()])
    
    submit = SubmitField('Zaloguj się')

app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config['SECRET_KEY'] = secrets.token_urlsafe(32)

@app.route('/', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    if login_form.validate_on_submit():
        if login_form.username.data == VALID_USERNAME and login_form.password.data == VALID_PASSWORD:
            session['username'] = login_form.username.data
            flash('Zalogowano poprawnie', 'success')
            return redirect(url_for('dashboard'))

        flash('Nieprawidłowe dane', 'error')
    
    return render_template('login.html', title='Logowanie', login_form=login_form)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', title='Dashboard')

@app.route('/logout')
def logout():
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)