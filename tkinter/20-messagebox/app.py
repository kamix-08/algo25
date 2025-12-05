import tkinter as tk
from tkinter import messagebox

root = tk.Tk()
root.title("Messagebox")
root.geometry("300x250")

def show_info():
    messagebox.showinfo("Informacja", "Operacja zakończona pomyślnie")
    
def show_warning():
    messagebox.showwarning("Ostrzeżenie", "To może być niebezpieczne")
    
def show_error():
    messagebox.showerror("Błąd", "Wystąpił nieoczekiwany błąd!")
    
def ask_question():
    answer = messagebox.askquestion("Pytanie", "Czy chcesz kontynuować?")
    if answer == "yes":
        messagebox.showinfo("OK", "Kontynuujemy...")
    else:
        messagebox.showinfo("Anulowano", "Operacja anulowana")
    
def ask_yesno():
    if messagebox.askyesno("Potwierdzenie", "Czy na pewno chcesz zamknąć program?"):
        root.destroy()

tk.Button(root, text='Informacja', command=show_info).pack(pady=5)
tk.Button(root, text='Ostrzeżenie', command=show_warning).pack(pady=5)
tk.Button(root, text='Błąd', command=show_error).pack(pady=5)
tk.Button(root, text='Pytanie', command=ask_question).pack(pady=5)
tk.Button(root, text='Tak/Nie', command=ask_yesno).pack(pady=5)

root.mainloop()