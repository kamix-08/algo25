import tkinter as tk
from tkinter import ttk
from tkinter import messagebox

root = tk.Tk()
root.geometry("300x500")
root.title("Pizzeria")

tk.Label(root, text='Podaj imię:').pack(pady=(10,0))
entry = tk.Entry(root, width=200)
entry.pack(anchor='w', padx=25)

prices = {
    "Mała": 15,
    "Średnia": 20,
    "Duża": 25,
}

tk.Label(root, text='Wybierz rozmiar pizzy:').pack(pady=(10,0))
combobox = ttk.Combobox(root, values=[f"{k} - {v}zł" for k, v in prices.items()], width=200, state='readonly')
combobox.pack(anchor='w', padx=25)

dough = tk.StringVar()

tk.Label(root, text='Wybierz rodzaj ciasta:').pack(pady=(10,0))

def add_rb(val):
    rb = tk.Radiobutton(root, value=val, variable=dough, text=val)
    rb.pack(anchor='w', padx=25)
    
add_rb('Cienkie')
add_rb('Grube')

additions = {
    "Ser": 3,
    "Szynka": 4,
    "Pieczarki": 2,
    "Oliwki": 2,
}

tk.Label(root, text='Wybierz dodatki:').pack(pady=(10,0))

cbs = {}

def add_cb(val):
    var = tk.BooleanVar()
    
    cb = tk.Checkbutton(root, variable=var, text=val)
    cb.pack(anchor='w', padx=25)
    
    cbs[val] = var
    
for k, v in additions.items():
    add_cb(f"{k} - {v}zł")
    
tk.Label(root, text='Wybierz ostrość sosu:').pack(pady=(10,0))
scale = tk.Scale(from_=0, to=10, tickinterval=1, orient='horizontal', length=250)
scale.pack()

def submit():
    n = entry.get().strip()
    
    if n == "":
        messagebox.showerror('Błąd', 'Musisz podać imię!')
        return
    
    s = combobox.get().split(' - ')[0]
    a = [k.split(' - ')[0] for k, v in cbs.items() if v.get()]
    
    messagebox.showinfo('Cena', f"Imię: {n}\n\
Rozmiar: {s}\n\
Dodatki: {', '.join(a)}\n\
Ostrość: {scale.get()}\n\n\
Cena: {prices[s] + sum([additions[x] for x in a])}zł")
    
def clear():
    entry.delete(0, 'end')
    combobox.set('')
    scale.set(0)
    
    dough.set('')
    
    for _, v in cbs.items():
        v.set(False)

tk.Button(root, text='Podsumowanie', command=submit).pack(pady=(10,5))
tk.Button(root, text='Wyczyść', command=clear).pack()

root.mainloop()