import tkinter as tk
from tkinter import messagebox

root = tk.Tk()
root.title("Przykład Listbox")
root.geometry("300x300")

tk.Label(root, text='Wybierz języki programowania:').pack(pady=10)

listbox = tk.Listbox(root, selectmode='multiple', height=8)
languages = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby']

listbox.insert('end', *languages)
listbox.pack(pady=10, padx=10, fill='both', expand=True)

def show_selection():
    selected = listbox.curselection()
    
    if not selected:
        messagebox.showinfo('Wynik', 'Nie wybrano żadnego języka')
        return

    messagebox.showinfo('Twoje wybory', f"Wybrano {', '.join([listbox.get(i) for i in selected])}")

tk.Button(root, text='Pokaż wybory', command=show_selection).pack(pady=10)

root.mainloop()