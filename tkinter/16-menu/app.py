import tkinter as tk
from tkinter import messagebox

root = tk.Tk()
root.title("Przykład menu")
root.geometry("400x300")

menu_bar = tk.Menu(root)
root.config(menu=menu_bar)

def add_commands(menu, commands):
    for cmd in commands:
        if cmd == " ": menu.add_separator()
        else: menu.add_command(label=cmd[0], command=cmd[1])
        
def new_file():
    messagebox.showinfo('Nowy plik', '')
    
def open_file():
    messagebox.showinfo('Otwórz plik')
    
def save_file():
    messagebox.showinfo('Zapisz plik')
    
def about():
    messagebox.showinfo('O programie')

file_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label='Plik', menu=file_menu)

add_commands(file_menu, [
    ('Nowy', new_file),
    ('Otwórz', open_file), 
    ('Zapisz', save_file), 
    ' ', 
    ('Wyjdź', root.quit)
])

help_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label='Pomoc', menu=help_menu)

add_commands(help_menu, [
    ('O programie', about)
])

root.mainloop()