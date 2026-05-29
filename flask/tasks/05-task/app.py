from flask import Flask

app = Flask(__name__)

jablka = [] # data	odmiana	typ	nip	kg
cennik = [] # odmiana	cena

err = ""

@app.route('/api/analiza/top-klienci-zimowe', methods=['GET'])
def top_klienci_zimowe():
    if err:
        return {
            "status": "error",
            "code": 500,
            "message": f"Błąd wczytywania pliku: {err}"
        }
    
    klienci_zimowe = {}
    for jablko in jablka:
        if jablko[2] == 'Z':
            klient = jablko[3]
            ilosc = int(jablko[4])
            if klient in klienci_zimowe:
                klienci_zimowe[klient] += ilosc
            else:
                klienci_zimowe[klient] = ilosc
    
    return {
        "status": "success", 
        "analiza": "7.1",
        "nazwa": "Top 3 klienci - jabłka zimowe",
        "data": {
            "top_klienci": [{"nip": x[0], "kilogramy": x[1]} for x in sorted(klienci_zimowe.items(), key=lambda x: x[1], reverse=True)[:3]]
        }
    }
    
@app.route('/api/analiza/przychod', methods=['GET'])
def przychod():
    if err:
        return {
            "status": "error",
            "code": 500,
            "message": f"Błąd wczytywania pliku: {err}"
        }
    
    przychody = {}
    for jablko in jablka:
        odmiana = jablko[1]
        ilosc = int(jablko[4])
        cena = next((c[1] for c in cennik if c[0] == odmiana), 0)
        przychod = ilosc * float(cena)
        
        if odmiana in przychody:
            przychody[odmiana] += przychod
        else:
            przychody[odmiana] = przychod
            
    return {
        "status": "success", 
        "analiza": "7.2",
        "nazwa": "Przychód i najlepsza odmiana",
        "data": {
            "calkowity_przychod": sum(przychody.values()),
            "najlepsza_odmiana": max(przychody.items(), key=lambda x: x[1])[0],
            "przychod_najlepszej": max(przychody.values()),
            "top_odmiany": [{"odmiana": x[0], "przychod": x[1]} for x in sorted(przychody.items(), key=lambda x: x[1], reverse=True)[:3]]
        }
    }
    
@app.route('/api/analiza/popularnosc-miesiecy', methods=['GET'])
def popularnosc_miesiecy():
    if err:
        return {
            "status": "error",
            "code": 500,
            "message": f"Błąd wczytywania pliku: {err}"
        }
    
    transkacje_miesiecy = {}
    for jablko in jablka:
        data = jablko[0]
        miesiac = '-'.join(data.split("-")[:2])
        if miesiac in transkacje_miesiecy:
            transkacje_miesiecy[miesiac].append(jablko)
        else:
            transkacje_miesiecy[miesiac] = [jablko]
            
    data = []
    
    for miesiac in transkacje_miesiecy:
        odmiany = {}
        for jablko in transkacje_miesiecy[miesiac]:
            odmiana = jablko[1]
            ilosc = int(jablko[4])
            if odmiana in odmiany:
                odmiany[odmiana] += ilosc
            else:
                odmiany[odmiana] = ilosc
                
        data.append({
            "miesiac": miesiac,
            "miesiac_nazwa": ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'][int(miesiac.split("-")[1]) - 1],
            "najpopularniejsza": max(odmiany.items(), key=lambda x: x[1])[0],
            "ilosc": max(odmiany.values())
        })

    return {
        "status": "success",
        "analiza": "7.3",
        "nazwa": "Najpopularniejsza odmiana w każdym miesiącu",
        "data": {
            "miesiace": sorted(data, key=lambda x: x["miesiac"])
        }
    }
    
@app.route('/api/analiza/rabaty', methods=['GET'])
def rabaty():
    if err:
        return {
            "status": "error",
            "code": 500,
            "message": f"Błąd wczytywania pliku: {err}"
        }
    
    klienci = {}
    
    rabat_5gr = 0
    rabat_5gr_liczba = 0
    
    rabat_10gr = 0
    rabat_10gr_liczba = 0
    
    for jablko in jablka:
        klient = jablko[3]
        ilosc = int(jablko[4])
        
        ilosc_do_tej_pory = klienci.get(klient, 0)
        if ilosc_do_tej_pory >= 15_000 and ilosc_do_tej_pory < 20_000:
            rabat_5gr += ilosc * 0.05
            rabat_5gr_liczba += 1
        elif ilosc_do_tej_pory >= 20_000:
            rabat_10gr += ilosc * 0.10
            rabat_10gr_liczba += 1
        
        if klient in klienci:
            klienci[klient] += ilosc
        else:
            klienci[klient] = ilosc
            
    return {
        "status": "success",
        "analiza": "7.4",
        "nazwa": "System rabatów dla klientów hurtowych",
        "data": {
            "liczba_transakcji_z_rabatem": rabat_5gr_liczba + rabat_10gr_liczba,
            "calkowita_wartosc_rabatow": rabat_5gr + rabat_10gr,
            "przedzial_5_groszy": {
                "liczba_transakcji": rabat_5gr_liczba,
                "calkowita_wartosc": rabat_5gr
            },
            "przedzial_10_groszy": {
                "liczba_transakcji": rabat_10gr_liczba,
                "calkowita_wartosc": rabat_10gr
            }
        }
    }

if __name__ == "__main__":
    try:
        with open("jablka.txt", "r") as f:
            jablka = [line.strip().split("\t") for line in f][1:]
        
        with open("cennik.txt", "r") as f:
            cennik = [line.strip().split("\t") for line in f][1:]
            cennik = [(c[0], float(c[1].replace(",", "."))) for c in cennik]
            
    except Exception as e:
        err = e
        
    app.run(debug=True)