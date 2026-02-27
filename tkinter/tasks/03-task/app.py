import tkinter as tk
from tkinter import ttk, messagebox
import string, random

root = tk.Tk()
root.title('dodaj pracownika')
root.geometry('500x300')
root.config(bg='#B0C4DE')

mf = tk.Frame(root, bg='#B0C4DE')
frame1 = tk.LabelFrame(mf, text='dane pracownika', bg='#B0C4DE')

def createRow(master, name):
    f = tk.Frame(master, bg='#B0C4DE')
    tk.Label(f, text=name, width=10, bg='#B0C4DE').pack(side='left')
    entry = tk.Entry(f, width=20)
    entry.pack(side='left', padx=(0,10))
    f.pack(anchor='w')

    return entry

name = createRow(frame1, 'imię:')
lastname = createRow(frame1, 'nazwisko:')

r = tk.Frame(frame1, bg='#B0C4DE')
tk.Label(r, text='stanowisko:', width=10, bg='#B0C4DE').pack(side='left')
select = ttk.Combobox(r, values=['kierownik', 'starszy programista', 'młodszy programista', 'tester'], width=17)
select.pack(side='left')
r.pack(anchor='w')

frame1.pack(side='left', padx=10, pady=10, fill='both', expand=True)

frame2 = tk.LabelFrame(mf, text='generowanie hasła', bg='#B0C4DE')

nchars = createRow(frame2, 'ile znaków?')

cbs = {}
def createCb(master, name, x=False):
    f = tk.Frame(master, bg='#B0C4DE')
    var = tk.BooleanVar(value=x)
    cb = tk.Checkbutton(f, bg='#B0C4DE', variable=var)
    cb.pack(side='left')
    cbs[name] = var
    tk.Label(f, text=name, bg='#B0C4DE').pack(side='left')
    f.pack(anchor='w')
    
createCb(frame2, 'małe i wielkie litery', True)
createCb(frame2, 'cyfry')
createCb(frame2, 'znaki specjalne')

passwd = ''

def genpass():
    global passwd
    charset = string.ascii_lowercase
    
    if cbs['małe i wielkie litery'].get():
        charset += string.ascii_uppercase
    
    if cbs['cyfry'].get():
        charset += string.digits
        
    if cbs['znaki specjalne'].get():
        charset += '!@#$%^&*()_+-='
        
    passwd = ''.join(random.choices(charset, k=int(nchars.get())))
    messagebox.showinfo('', 'hasło: ' + passwd)

tk.Button(frame2, text='generuj hasło', command=genpass, width=10, bg='#4682B4', fg='white').pack(pady=(5,10))

frame2.pack(side='left', padx=(0,10), pady=10, fill='both', expand=True)
mf.pack()

def save():
    messagebox.showinfo('', f'dane pracownika: {name.get()} {lastname.get()}\n{select.get()}\nhasło: {passwd}')

tk.Button(root, text='zatwierdź', command=save, width=15, bg='#4682B4', fg='white').pack()

root.mainloop()