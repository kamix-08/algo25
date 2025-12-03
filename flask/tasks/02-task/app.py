from flask import Flask, render_template, request, redirect, url_for, flash
from flask_bs4 import Bootstrap
import secrets, os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
    
app = Flask(__name__)
Bootstrap(app)

app.config['SECRET_KEY'] = secrets.token_urlsafe(64)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

os.makedirs(DATA_DIR, exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(DATA_DIR, 'tasks.db')

db = SQLAlchemy()
db.init_app(app)
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    priority = db.Column(db.String(10), default='średni')

    def __repr__(self):
        return f"<Task #{self.id} '{self.title}' priorytet={self.priority} ukończone={self.completed}>"
    
@app.route('/')
def index():
    query = Task.query
    records = query.order_by(Task.created_at.desc())
    total = query.count()
    done = query.filter_by(completed=True).count()
    todo = total - done
    return render_template('index.html', title='Strona główna', records=records, total=total, done=done, todo=todo)

@app.route('/add', methods=["GET", "POST"]) # type: ignore
def add():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        priority = request.form.get('priority', 'średni')
        
        if title.strip() == "": # type: ignore
            flash('Tytuł nie może być pusty', 'danger')
            return redirect(url_for('index'))
        
        new_task = Task(
            title=title, # type: ignore
            description=description, # type: ignore
            priority=priority # type: ignore
        )
        
        db.session.add(new_task)
        db.session.commit()
        
        flash('Zadanie dodane', 'success')
        return redirect(url_for('index'))
    
    return render_template("add_task.html", title="Dodaj zadanie")
    
@app.route('/edit/<int:id>', methods=["GET", "POST"]) # type: ignore
def edit(id):
    task = Task.query.get(id)
        
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        priority = request.form.get('priority', 'średni')
        completed = bool(request.form.get('completed', False))
        
        if title.strip() == "": # type: ignore
            flash('Tytuł nie może być pusty', 'danger')
            return redirect(url_for('index'))
        
        task.title = title # type: ignore
        task.description = description # type: ignore
        task.priority = priority # type: ignore
        task.completed = completed # type: ignore
        
        db.session.commit()
        
        flash('Zadanie zmodyfikowane', 'success')
        return redirect(url_for('index'))
    
    return render_template("edit_task.html", title="Edytuj zadanie", task=task)
    
@app.route('/delete/<int:id>')
def delete(id):
    db.session.query(Task).filter_by(id=id).delete()
    db.session.commit()
    flash('Zadanie usunięte', 'success')
    return redirect(url_for('index'))

@app.route('/toggle/<int:id>') # type: ignore
def toggle(id):
    task = Task.query.get(id)
    task.completed = not task.completed # type: ignore
    
    db.session.commit()
    flash('Zadanie zmienione', 'success')
    return redirect(url_for('index'))

with app.app_context():
    db.create_all()

app.run()