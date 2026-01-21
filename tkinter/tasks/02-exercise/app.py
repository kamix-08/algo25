import requests
import json
import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("Pogoda")
root.geometry("200x350")

tk.Label(root, text="Prognoza pogody", font=("Arial", 16, "bold")).pack()

tk.Label(root, text="Wybierz miasto:").pack(pady=10)

cities = [s['stacja'] for s in json.loads(requests.get(r'https://danepubliczne.imgw.pl/api/data/synop').text)]
stations = json.loads(requests.get(r'https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll?size=9999').text)['Lista stacji pomiarowych']

def onSubmit():
    city = cb.get()
    data = json.loads(requests.get(rf'https://danepubliczne.imgw.pl/api/data/synop/station/{city.lower().replace(' ', '')
        .replace('ą', 'a').replace('ć', 'c').replace('ę', 'e')
        .replace('ł', 'l').replace('ń', 'n').replace('ó', 'o')
        .replace('ś', 's').replace('ź', 'z').replace('ż', 'z')}').text)
    
    categories = {
        'Nazwa kategorii indeksu dla wskażnika SO2': '',
        'Nazwa kategorii indeksu dla wskażnika NO2': '',
        'Nazwa kategorii indeksu dla wskażnika PM10': '',
        'Nazwa kategorii indeksu dla wskażnika PM2.5': '',
        'Nazwa kategorii indeksu dla wskażnika O3': ''
    }
    
    allFound = True
    for id in [s['Identyfikator stacji'] for s in stations if s['Nazwa miasta'] == city]:
        index = json.loads(requests.get(rf'https://api.gios.gov.pl/pjp-api/v1/rest/aqindex/getIndex/{id}').text)['AqIndex']
        
        for cat in categories.keys():
            if categories[cat] != '':
                continue
            
            if index[cat] != None:
                categories[cat] = index[cat].lower()
            
            else:
                allFound = False
                
        if allFound:
            break
        
    for cat in categories.keys():
        if categories[cat] == '':
            categories[cat] = 'brak danych'
    
    res.config(text=f"Miasto: {data['stacja']}\n\
Temperatura: {data['temperatura']}°C\n\
Wilgotność: {data['wilgotnosc_wzgledna']}%\n\
Prędkość wiatru: {data['predkosc_wiatru']}m/s\n\
Kierunek wiatru: {data['kierunek_wiatru']}°\n\
Ciśnienie: {data['cisnienie']}hPa\n\
Opady: {data['suma_opadu']}mn\n\
SO2: {categories['Nazwa kategorii indeksu dla wskażnika SO2']}\n\
NO2: {categories['Nazwa kategorii indeksu dla wskażnika NO2']}\n\
PM10: {categories['Nazwa kategorii indeksu dla wskażnika PM10']}\n\
PM2.5: {categories['Nazwa kategorii indeksu dla wskażnika PM2.5']}\n\
O3: {categories['Nazwa kategorii indeksu dla wskażnika O3']}")

cb = ttk.Combobox(root, values=cities, state='readonly')
cb.pack()

tk.Button(root, text='Sprawdź pogodę', command=onSubmit).pack(pady=10)

res = tk.Label(root, text='', justify='left')
res.pack()

root.mainloop()