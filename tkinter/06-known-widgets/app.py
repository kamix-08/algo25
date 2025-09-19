import tkinter as tk
from tkinter import ttk

root = tk.Tk()

root.geometry("400x350")
root.title("Konfigurator samochodu")

font = ("Arial", 12, "bold")

tk.Label(root, text="Podaj markę samochodu", font=font).pack(pady=5)

entry = tk.Entry(root)
entry.pack(pady=5)

tk.Label(root, text="Wybierz rodzaj nadwozia", font=font).pack(pady=5)

bodies = ["Sedan", "Kombi", "SUV", "Hatchback", "Coupe", "Pickup"]
combobox = ttk.Combobox(root, values=bodies, state="readonly")
combobox.pack(pady=5)

cbs = {}
def create_cb(name):
    var = tk.BooleanVar()
    cb = tk.Checkbutton(root, text=name, variable=var)
    cb.pack(anchor='w', padx=25)
    
    cbs[name] = (cb, var)
    
create_cb("Klimatyzacja")
create_cb("Nawigacja")
create_cb("Skórzana tapicerka")

def show_summary():
    brand = entry.get().strip()
    if brand == "": brand = "NIE PODANO"
    
    body = combobox.get()
    if body == "": body = "NIE WYBRANO"
    
    additional = []
    
    for name, (_, var) in cbs.items():
        if var.get():
            additional.append(name)
            
    if len(additional) == 0: additional = "BRAK"
    else: additional = ', '.join(additional)
    
    summary.config(text=f"Wybrałeś samochód:\n- Marka: {brand}\n- Nadwozie: {body}\n- Wyposażenie: {additional}")
    
submit = tk.Button(root, text="Pokaż podsumowanie", command=show_summary)
submit.pack(pady=5)

summary = tk.Label(root)
summary.pack(pady=5)

root.mainloop()