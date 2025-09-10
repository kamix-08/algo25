from flask import Flask, render_template
from flask_bs4 import Bootstrap # type: ignore

app = Flask(__name__)
bootstrap = Bootstrap(app)

users = [
    {'id': 1, 'name': 'Krzysztof', 'email': 'krzysztof@poczta.pl'},
    {'id': 2, 'name': 'Filip', 'email': 'filip@poczta.pl'},
    {'id': 3, 'name': 'Paweł', 'email': 'pawel@poczta.pl'},
]

@app.route('/')
def index():
    return render_template('index.html', title='Home', users=users)

@app.route('/user/<int:id>')
def user(id):
    user = next((user for user in users if user['id'] == id), None)    
    return render_template('user.html', user=user, title='Profil użytkownika')

if __name__ == "__main__":
    app.run(debug=True)