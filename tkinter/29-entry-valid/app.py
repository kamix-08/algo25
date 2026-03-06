import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title('Entry Valid')
root.geometry('300x200')

def only_numbers(char):
    return char.isdigit()

cmd = root.register(only_numbers)

entry = ttk.Entry(root, validate='key', validatecommand=(cmd, '%P'))
entry.pack(pady=20)

root.mainloop()