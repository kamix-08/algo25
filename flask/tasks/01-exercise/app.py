from flask import Flask, render_template
import json
import requests

app = Flask(__name__)

cities = [s['stacja'] for s in json.loads(requests.get(r'https://danepubliczne.imgw.pl/api/data/synop').text)]
stations = json.loads(requests.get(r'https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll?size=9999').text)['Lista stacji pomiarowych']

@app.route('/')
def index():
    return render_template('main.html', cities=cities)
    
@app.route('/weather/<city>')
def weather(city):
    data = json.loads(requests.get(rf'https://danepubliczne.imgw.pl/api/data/synop/station/{city.lower().replace(' ', '')
        .replace('ą', 'a').replace('ć', 'c').replace('ę', 'e')
        .replace('ł', 'l').replace('ń', 'n').replace('ó', 'o')
        .replace('ś', 's').replace('ź', 'z').replace('ż', 'z')}').text)
    
    categories = {
        'SO2': '',
        'NO2': '',
        'PM10': '',
        'PM2.5': '',
        'O3': ''
    }
    
    allFound = True
    for id in [s['Identyfikator stacji'] for s in stations if s['Nazwa miasta'] == city]:
        index = json.loads(requests.get(rf'https://api.gios.gov.pl/pjp-api/v1/rest/aqindex/getIndex/{id}').text)['AqIndex']
        
        for cat in categories.keys():
            if categories[cat] != '':
                continue
            
            key = f'Nazwa kategorii indeksu dla wskażnika {cat}'
            if index[key] != None:
                categories[cat] = index[key].lower()
            
            else:
                allFound = False
                
        if allFound:
            break
        
    for cat in categories.keys():
        if categories[cat] == '':
            categories[cat] = 'brak danych'
    
    return render_template('weather.html', data={
        'stacja': data['stacja'],
        'temperatura': data['temperatura'] + '°C',
        'wilgotność': data['wilgotnosc_wzgledna'] + '%',
        'prędkość wiatru': data['predkosc_wiatru'] + 'm/s',
        'kierunek wiatru': data['kierunek_wiatru'] + '°',
        'ciśnienie': data['cisnienie'] + 'hPa',
        'opday': data['suma_opadu'] + 'mm',
        'SO2': categories['SO2'],
        'NO2': categories['NO2'],
        'PM10': categories['PM10'],
        'PM2.5': categories['PM2.5'],
        'O3': categories['O3']
    })
    
if __name__ == "__main__":
    app.run(debug=True)