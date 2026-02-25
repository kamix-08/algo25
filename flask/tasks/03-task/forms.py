from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
    title = StringField('Tytuł', validators=[DataRequired()])
    author = StringField('Autor', validators=[DataRequired()])
    genre = StringField('Gatunek')
    published_year = IntegerField('Rok wydania', validators=[DataRequired()])
    description = TextAreaField('Opis')
    cover_art = StringField('Link do okładki')
    
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = StringField('Hasło', validators=[DataRequired()])
    
class RegisterForm(LoginForm):
    first_name = StringField('Imię', validators=[DataRequired()])
    last_name = StringField('Nazwisko', validators=[DataRequired()])