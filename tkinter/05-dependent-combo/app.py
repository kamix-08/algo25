import tkinter as tk
from tkinter import ttk

categories = {
    "Języki programowania": ["Python", "JS", "Go", "C++"],
    "Systemy operacyjne": ["Windows", "MacOS", "Linux"],
    "Bazy danych": ["MySQL", "SQLite", "MongoDB"],
}

def update_combo(e):
    subcat_combo.config(values=categories[category_combo.get()])
    subcat_combo.set('')
    result_label.config(text='')
    
def display(e):
    result_label.config(text=subcat_combo.get())

root = tk.Tk()
root.geometry("300x200")
root.title("Combobox")

tk.Label(root, text='Wybierz kategorię:', font=("Arial", 12)).pack(pady=10)
category_combo = ttk.Combobox(root, values=list(categories.keys()), state='readonly', font=("Arial", 14))
category_combo.pack(pady=5)
category_combo.bind('<<ComboboxSelected>>', update_combo)

tk.Label(root, text='Wybierz podkategorię:', font=("Arial", 12)).pack(pady=10)
subcat_combo = ttk.Combobox(root, state='readonly', font=("Arial", 14))
subcat_combo.pack(pady=5)
subcat_combo.bind('<<ComboboxSelected>>', display)

result_label = tk.Label(root, font=("Arial", 12))
result_label.pack(pady=10)

root.mainloop()