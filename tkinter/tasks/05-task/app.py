import tkinter as tk
from tkinter import ttk
import os

class TableExample(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.kierowcy = self.wczytaj_dane('kierowcy.txt')       # IdOsoby;Imie;Nazwisko;NrRejestracyjny
        self.rejestr = self.wczytaj_dane('rejestr.txt')         # IdZdarzenia;Data;IdOsoby;IdWykroczenia
        self.taryfikator = self.wczytaj_dane('taryfikator.txt') # IdWykroczenia;Wykroczenie;Punkty;Kwota

        self.title("Rejestr wykroczeń drogowych")
        self.geometry("500x300")

        tk.Label(self, text='Rejestr wykroczeń drogowych').pack(pady=10)
        
        self.kierowcy_var = tk.StringVar(value='Wszyscy')
        self.wykroczenia_var = tk.StringVar(value='Wszystkie')
        
        div = tk.Frame(self)
        
        dropdown_kierowcy = ttk.Combobox(div, values=[f"{k[1]} {k[2]}" for k in self.kierowcy] + ['Wszyscy'], state='readonly', textvariable=self.kierowcy_var)
        dropdown_kierowcy.pack(side='left', padx=5)
        dropdown_kierowcy.bind("<<ComboboxSelected>>", self.resetuj_wypelnione)
        
        dropdown_wykroczenia = ttk.Combobox(div, values=[w[1] for w in self.taryfikator] + ['Wszystkie'], state='readonly', textvariable=self.wykroczenia_var)
        dropdown_wykroczenia.pack(side='left', padx=5)
        dropdown_wykroczenia.bind("<<ComboboxSelected>>", self.resetuj_wypelnione)
        
        przycisk_resetuj = tk.Button(div, text='Resetuj', command=self.resetuj_czyste)
        przycisk_resetuj.pack(side='left', padx=5)
        
        div.pack(pady=10)
        
        div2 = tk.Frame(self)
        
        tk.Label(div2, text='Liczba wykroczeń:').grid(row=0, column=0, padx=5)
        self.liczba_wykroczen_label = tk.Label(div2)
        self.liczba_wykroczen_label.grid(row=0, column=1, padx=5)
        
        tk.Label(div2, text='Całkowita kwota:').grid(row=0, column=2, padx=5)
        self.calkowita_kwota_label = tk.Label(div2)
        self.calkowita_kwota_label.grid(row=0, column=3, padx=5)

        tk.Label(div2, text='Całkowita liczba punktów:').grid(row=0, column=4, padx=5)
        self.calkowita_punkty_label = tk.Label(div2)
        self.calkowita_punkty_label.grid(row=0, column=5, padx=5)
        
        tk.Label(div2, text='Najczęstsze wykroczenie:').grid(row=0, column=6, padx=5)
        self.najczestsze_wykroczenie_label = tk.Label(div2)
        self.najczestsze_wykroczenie_label.grid(row=0, column=7, padx=5)

        tk.Label(div2, text='Największa kwota:').grid(row=0, column=8, padx=5)
        self.najwiesksza_kwota_label = tk.Label(div2)
        self.najwiesksza_kwota_label.grid(row=0, column=9, padx=5)

        div2.pack(pady=10)

        columns = ['ID', 'Data', 'Kierowca', 'Nr Rej.', 'Typ Wykroczenia', 'Punkty', 'Kwota']
        self.table = ttk.Treeview(self, columns=columns, show='headings', height=8)

        self.table.heading('ID', text='ID')
        self.table.heading('Data', text='Data')
        self.table.heading('Kierowca', text='Kierowca')
        self.table.heading('Nr Rej.', text='Nr Rej.')
        self.table.heading('Typ Wykroczenia', text='Typ Wykroczenia')
        self.table.heading('Punkty', text='Punkty')
        self.table.heading('Kwota', text='Kwota')

        self.table.column('ID', width=50, anchor='center')
        self.table.column('Data', width=100, anchor='center')
        self.table.column('Kierowca', width=150, anchor='center')
        self.table.column('Nr Rej.', width=100, anchor='center')
        self.table.column('Typ Wykroczenia', width=150, anchor='center')
        self.table.column('Punkty', width=100, anchor='center')
        self.table.column('Kwota', width=100, anchor='center')

        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.table.yview)
        self.table.configure(yscrollcommand=scrollbar.set)

        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.table.yview)
        self.table.configure(yscrollcommand=scrollbar.set)

        self.table.pack(side='left', fill='both', expand=True, padx=(20,0))
        scrollbar.pack(side='right', fill='y')
        
        self.resetuj()
        
    def wczytaj_dane(self, plik):
        if not os.path.exists(plik):
            print(f"Plik {plik} nie istnieje.")
            return []
        
        dane = []
        
        with open(plik, 'r', encoding='utf-8') as f:
            for line in f:
                dane.append(line.strip().split(';'))
        
        return dane[1:]
    
    def aktualizuj(self):
        for i in self.table.get_children():
            self.table.delete(i)
        
        for entry in self.entries:
            self.table.insert('', 'end', values=entry)
            
    def resetuj(self, filtr_kierowca=None, filtr_wykroczenie=None):
        self.entries = []
        
        calkowita_kwota = 0
        calkowita_punkty = 0
        
        for rejestr in self.rejestr:
            id_zdarzenia, data, id_osoby, id_wykroczenia = rejestr
            
            kierowca = next((k for k in self.kierowcy if k[0] == id_osoby), None)
            wykroczenie = next((w for w in self.taryfikator if w[0] == id_wykroczenia), None)
            if not kierowca or not wykroczenie:
                continue
            
            if filtr_kierowca and filtr_kierowca != 'Wszyscy' and kierowca and f"{kierowca[1]} {kierowca[2]}" != filtr_kierowca:
                continue
            
            if filtr_wykroczenie and filtr_wykroczenie != 'Wszystkie' and wykroczenie and wykroczenie[1] != filtr_wykroczenie:
                continue

            imie_nazwisko = f"{kierowca[1]} {kierowca[2]}"
            nr_rejestracyjny = kierowca[3]
            typ_wykroczenia = wykroczenie[1]
            punkty = wykroczenie[2]
            kwota = float(wykroczenie[3])
            
            calkowita_kwota += int(kwota)
            calkowita_punkty += int(punkty)
            
            self.entries.append([id_zdarzenia, data, imie_nazwisko, nr_rejestracyjny, typ_wykroczenia, punkty, f'{kwota:.2f}'])
            
        self.aktualizuj()
        
        self.liczba_wykroczen_label.config(text=str(len(self.entries)))
        self.calkowita_kwota_label.config(text=str(calkowita_kwota))
        self.calkowita_punkty_label.config(text=str(calkowita_punkty))
        
        najczestsze_wykroczenie = max(set([e[4] for e in self.entries]), key=[e[4] for e in self.entries].count) if self.entries else 'Brak danych'
        self.najczestsze_wykroczenie_label.config(text=najczestsze_wykroczenie + f' ({[e[4] for e in self.entries].count(najczestsze_wykroczenie)} razy)' if self.entries else '')
        
        kierowca_najwiesksza_kwota_suma = max([(sum(float(e[6]) for e in self.entries if e[2] == k[1] + ' ' + k[2]), k[1] + ' ' + k[2], sum(float(e[6]) for e in self.entries if e[2] == k[1] + ' ' + k[2])) for k in self.kierowcy], key=lambda x: x[0]) if self.entries else None
        self.najwiesksza_kwota_label.config(text=f"{kierowca_najwiesksza_kwota_suma[1]} ({kierowca_najwiesksza_kwota_suma[0]} zł)" if kierowca_najwiesksza_kwota_suma else 'Brak danych')

    def resetuj_wypelnione(self, e):
        self.resetuj(filtr_kierowca=self.kierowcy_var.get(), filtr_wykroczenie=self.wykroczenia_var.get())
        
    def resetuj_czyste(self):
        self.resetuj()
        self.kierowcy_var.set('Wszyscy')
        self.wykroczenia_var.set('Wszystkie')

if __name__ == "__main__":
    app = TableExample()
    app.mainloop()