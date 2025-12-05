import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("Option Menu")
root.geometry("300x200")

languages = ["Python", "JS", "C++", "Go"]
selected_lang = tk.StringVar(value=languages[0])

ttk.Label(root, text="Wybierz język:").pack(pady=5)
menu = ttk.OptionMenu(root, selected_lang, languages[0], *languages)
menu.pack(pady=10)

def show_choice():
    ttk.Label(root, text=f"Wybrałeś: {selected_lang.get()}").pack(pady=5)
    
ttk.Button(root, text='Pokaż wybór', command=show_choice).pack(pady=5)

root.mainloop()