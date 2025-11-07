import tkinter as tk
from tkinter import ttk, messagebox
import threading, time

root = tk.Tk()
root.title("Kalkulator zamówień obiadów")
root.geometry("300x700")

tk.Label(root, text="Kalkulator zamówień obiadów:").pack(pady=10)
tk.Label(root, text="Imię zamawiającego:").pack(anchor='w', padx=10)

name = tk.Entry(root)
name.pack(anchor='w', padx=10, fill='x')

tk.Label(root, text="Danie główne:").pack(anchor='w', padx=10, pady=(10,0))

dishes = {
    "Pierogi": 15,
    "Schabowy": 20,
    "Makaron": 10
}

def make_dish(k, v):
    return f"{k} (+{v}zł)"

dish = ttk.Combobox(root, values=[make_dish(k,v) for k,v in dishes.items()], state='readonly')
dish.pack(anchor='w', padx=10, fill='x')

tk.Label(root, text="Dodatki:").pack(anchor='w', padx=10, pady=(10,0))

cbs = {}
def make_cb(name, value):
    var = tk.BooleanVar()
    cb = tk.Checkbutton(root, variable=var, text=make_dish(name, value))
    cb.pack(anchor='w', padx=10)
    cbs[name] = var
    
addons = {
    "Zupa": 5,
    "Surówka": 4,
    "Deser": 6
}

for k, v in addons.items():
    make_cb(k, v)
    
tk.Label(root, text="Napój:").pack(anchor='w', padx=10, pady=(10,0))

rb_var = tk.StringVar()
def make_rb(name, value):
    rb = tk.Radiobutton(root, variable=rb_var, value=name, text=make_dish(name, value))
    rb.pack(anchor='w', padx=10)
    
drinks = {
    "Woda": 0,
    "Herbata": 3,
    "Kompot": 2
}

for k, v in drinks.items():
    make_rb(k, v)

tk.Label(root, text="Liczba porcji:").pack(anchor='w', padx=10, pady=(10,0))

def update_scale(_):
    n = scale.get()
    scale_label.config(text=f"{n} porcj{'a' if n == 1 else ('i' if n == 5 else 'e')}")

scale = tk.Scale(root, from_=1, to=5, orient='horizontal', length='290', command=update_scale)
scale.pack(anchor='w', padx=10, fill='x')

scale_label = tk.Label(root, text="1 porcja")
scale_label.pack()

cooldown_running = False

def submit():
    name_var = name.get().strip()
    
    if name_var == "":
        messagebox.showwarning("Brakujące dane", "Przy składaniu zamówienia należy podać imię!")
        return
    
    price = 0
    
    main_dish = dish.get().split(" ")[0]
    
    if main_dish == "":
        messagebox.showerror("Brakujące dane", "Wybierz danie główne")
        return
    
    global cooldown_running
    if cooldown_running:
        return
    
    cooldown_running = True
    
    price += dishes[main_dish]
    
    addns = []
    for k in addons.keys():
        if cbs[k].get():
            addns.append(k)
            price += addons[k]
            
    drink = rb_var.get()
    
    if drink != '':
        price += drinks[drink]
    
    n_portions = scale.get()
    price *= n_portions
        
    def cooldown():
        progress.config(value=0)
        
        for i in range(100):
            time.sleep(.01)
            progress.config(value=i+1)
            
        textarea.config(state='normal')
        textarea.delete('1.0', 'end')
        textarea.insert(tk.INSERT, f"Zamawiający: {name_var}\nDanie główne: {main_dish}\nDodatki: {', '.join(addns) if len(addns) > 0 else "Brak"}\nNapój: {drink if drink != "" else "Brak"}\nLiczba porcji: {n_portions}\nŁączna cena: {price}zł")
        textarea.config(state='disabled')
            
        global cooldown_running
        cooldown_running = False
        
    threading.Thread(target=cooldown, daemon=True).start()

submit_btn = tk.Button(root, text='Oblicz cenę', command=submit)
submit_btn.pack(pady=10)

progress = ttk.Progressbar(root, length=200)
progress.pack(pady=10)

tk.Label(root, text="Podsumowanie zamówienia:").pack(anchor='w', padx=10, pady=(10,0))

textarea = tk.Text(root, height=6, state='disabled')
textarea.pack(anchor='w', padx=10, fill='x')

def reset():
    name.delete(0, 'end')
    dish.set('')
    
    for k in addons.keys():
        cbs[k].set(False)
        
    rb_var.set("")
    scale.set(1)
    progress.config(value=0)
    
    textarea.config(state='normal')
    textarea.delete("1.0", 'end')
    textarea.config(state='disabled')

menu = tk.Menu(root)
root.config(menu=menu)
file = tk.Menu(menu, tearoff=0)
menu.add_cascade(menu=file, label='Plik')
file.add_command(label='Nowe zamówienie', command=reset)
file.add_command(label='Zakończ', command=root.quit)

root.mainloop()