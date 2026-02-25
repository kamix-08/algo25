from flask import Flask, render_template, request, session, redirect, url_for
from flask_bs4 import Bootstrap

from models import Users, Books, db
from forms import BookForm, LoginForm, RegisterForm

app = Flask(__name__)
bootstrap = Bootstrap(app)

app.config['SECRET_KEY'] = 'zaq1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/', methods=['GET'])
def index():
    books = Books.query.all()
    
    allowed = False
    if session.get('user'):
        allowed = True
    
    return render_template('index.html', books=books, allowed=allowed)

@app.route('/add', methods=['GET', 'POST'])
def add():
    if not session.get('user'):
        return redirect(url_for('login'))
    
    form = BookForm()
    if request.method == "POST" and form.validate_on_submit():
        db.session.add(Books(
            title=form.title.data, # type: ignore
            author=form.author.data, # type: ignore
            genre=form.genre.data, # type: ignore
            published_year=form.published_year.data, # type: ignore
            description=form.description.data, # type: ignore
            cover_art=form.cover_art.data # type: ignore
        ))
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add.html', form=form)
    
@app.route('/edit/<id>', methods=['GET', 'POST'])
def edit(id):
    if not session.get('user'):
        return redirect(url_for('login'))
    
    book = Books.query.get(id)
    form = BookForm(obj=book)
    
    if request.method == "POST" and form.validate_on_submit():
        book.title = form.title.data # type: ignore
        book.author = form.author.data # type: ignore
        book.genre = form.genre.data # type: ignore
        book.published_year = form.published_year.data # type: ignore
        book.description = form.description.data # type: ignore
        book.cover_art = form.cover_art.data # type: ignore
        db.session.commit()
        return redirect(url_for('index'))
    
    return render_template('edit.html', form=form, book=book)
    
@app.route('/delete/<id>', methods=['GET'])
def delete(id):
    if not session.get('user'):
        return redirect(url_for('login'))
    
    book = Books.query.get(id)
    db.session.delete(book)
    db.session.commit()

    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    
    if request.method == "POST":
        user = Users.query.filter_by(user_email=request.form.get('email')).first()
        
        if user and user.user_password == request.form.get('password'):
            session['user'] = user.user_email
            return redirect(url_for('index'))
    
    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    
    if request.method == "POST":
        db.session.add(Users(
            user_email=request.form.get('email'), # type: ignore
            user_password=request.form.get('password'), # type: ignore
            user_first_name=request.form.get('first_name'), # type: ignore
            user_last_name=request.form.get('last_name') # type: ignore
        ))
        db.session.commit()
        
        return redirect(url_for('login'))
    
    return render_template('register.html', form=form)

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=5000)