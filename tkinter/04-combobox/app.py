import tkinter as tk
from tkinter import ttk

def selected(e):
    result_label.config(text=f'Wybrałeś: {combo.get()}')

root = tk.Tk()
root.geometry("350x150")
root.title("Combobox")

label = tk.Label(root, text='Wybierz język programowania:', font=("Arial", 12, 'bold'))
label.pack(pady=10)

langs = ["Python", "JS", "Go", "C++"]

combo = ttk.Combobox(root, values=langs, state='readonly')
combo.pack(pady=5)
combo.bind('<<ComboboxSelected>>', selected)

result_label = tk.Label(root, font=("Arial", 12))
result_label.pack(pady=10)

root.mainloop()