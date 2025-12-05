import tkinter as tk
from tkinter import font, ttk

root = tk.Tk()
root.title('Font Picker')
root.geometry('400x250')

sample_text = tk.Label(root, text='Przykładowy tekst', font=('Arial', 14))
sample_text.pack(pady=20)

def open_file_window():
    top = tk.Toplevel(root)
    top.title('Wybierz czcionkę')
    top.geometry('300x250')
    
    fonts = sorted(list(font.families()))
    
    selected_font = tk.StringVar(value='Arial')
    selected_size = tk.IntVar(value=14)
    
    ttk.Label(top, text='Czcionka:').pack(pady=5)
    combo = ttk.Combobox(top, values=fonts, textvariable=selected_font)
    combo.pack(pady=5)
    
    ttk.Label(top, text='Rozmiar:').pack(pady=5)
    spin_size = ttk.Spinbox(top, from_=8, to=72, textvariable=selected_size)
    spin_size.pack(pady=5)
    
    def apply_font():
        sample_text.config(font=(selected_font.get(), selected_size.get()))
        top.destroy()
        
    ttk.Button(top, text='Zastosuj', command=apply_font).pack(pady=20)
    
ttk.Button(root, text='Zmień czcionkę', command=open_file_window).pack(pady=10)

root.mainloop()