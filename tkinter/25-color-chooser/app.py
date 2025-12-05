import tkinter as tk
from tkinter import colorchooser

root = tk.Tk()
root.title('Color Picker')
root.geometry('300x200')

def pick_color():
    color = colorchooser.askcolor(title='Wybierz kolor tła')
    
    if color[1] is None:
        return
    
    root.config(bg=color[1])
    label.config(text='Wybrano kolor: '+color[1])

label = tk.Label(root, text='Kliknij przycisk i wybierz kolor')
label.pack(pady=5)

tk.Button(root, text='Wybierz kolor', command=pick_color).pack(pady=5)

root.mainloop()