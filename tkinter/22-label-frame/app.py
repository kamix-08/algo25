import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("Label Frame")
root.geometry("300x200")

frame = ttk.LabelFrame(root, text="Preferencje", padding=10)
frame.pack(padx=10, pady=10, fill='both', expand=True)

ttk.Checkbutton(frame, text="Powiadomienia e-mail").pack(anchor='w', pady=2)
ttk.Checkbutton(frame, text="Tryb ciemny").pack(anchor='w', pady=2)
ttk.Checkbutton(frame, text="Automatyczne aktualizacje").pack(anchor='w', pady=2)

root.mainloop()