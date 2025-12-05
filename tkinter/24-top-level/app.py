import tkinter as tk
from tkinter import ttk, messagebox

root = tk.Tk()
root.title('Top Level')
root.geometry('300x200')

def open_form():
    form = tk.Toplevel(root)
    form.title("Nowy użytkownik")
    form.geometry("300x200")
    
    ttk.Label(form, text='Imię:').pack(pady=5)
    name_entry = ttk.Entry(form)
    name_entry.pack(pady=5)
    
    ttk.Label(form, text='Wiek:').pack(pady=5)
    age_entry = ttk.Entry(form)
    age_entry.pack(pady=5)
    
    def submit():
        name = name_entry.get()
        age = age_entry.get()
        messagebox.showinfo('Dane', f'Użytkownik {name} ma {age} lat')
        form.destroy()
        
    ttk.Button(form, text='Zapisz', command=submit).pack(pady=10)
    
ttk.Button(root, text="Dodaj użytkownika", command=open_form).pack(pady=40)

root.mainloop()