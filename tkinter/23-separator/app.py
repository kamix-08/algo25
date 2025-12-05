import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title('Spearator')
root.geometry('300x200')

ttk.Label(root, text='Dane użytkownika').pack(pady=5)
ttk.Entry(root).pack(pady=5)

ttk.Separator(root, orient='horizontal').pack(pady=10, padx=10, fill='x')

ttk.Label(root, text='Hasło użytkownika').pack(pady=5)
ttk.Entry(root, show='*').pack(pady=5)

root.mainloop()