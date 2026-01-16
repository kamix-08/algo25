import tkinter as tk
import tkmacosx as tkm
from tkinter import messagebox

root = tk.Tk()
root.geometry("300x300")
root.title("Miejsca zerowe funkcji kwadratowej")
root.config(bg='#2e4053')

def find_solutions():
    try:
        a = int(a_.get().strip())
        b = int(b_.get().strip())
        c = int(c_.get().strip())
    except:
        messagebox.showerror("Błąd", "Podano nieprawidłowe parametry")
        return
    
    if a == 0:
        messagebox.showerror("Błąd", "Parametr a nie moze być równy 0")
        return
        
    Δ = b**2 - 4*a*c
    
    if Δ < 0:
        res_.config(text="Brak rozwiązań")
        return
    
    if Δ == 0:
        x = -b / (2*a)
        x = round(x, 4)
        res_.config(text=f"x = {x}")
    
    x1 = (-b - Δ**0.5)/(2*a)
    x2 = (-b + Δ**0.5)/(2*a)
    
    x1, x2 = round(x1, 4), round(x2, 4)
    res_.config(text=f"x1 = {x1},\nx2 = {x2}")

tk.Label(root, text="Oblicz miejsca zerowe", fg='white', bg='#2e4053').pack(pady=10)

frame1 = tk.Frame(root, bg='#2e4053')
tk.Label(frame1, text="a:", fg='white', bg='#2e4053').pack(side='left', pady=10)
a_ = tk.Entry(frame1, width=10)
a_.pack(side='left')
frame1.pack()

frame2 = tk.Frame(root, bg='#2e4053')
tk.Label(frame2, text="b:", fg='white', bg='#2e4053').pack(side='left', pady=10)
b_ = tk.Entry(frame2, width=10)
b_.pack(side='left')
frame2.pack()

frame3 = tk.Frame(root, bg='#2e4053')
tk.Label(frame3, text="c:", fg='white', bg='#2e4053').pack(side='left', pady=10)
c_ = tk.Entry(frame3, width=10)
c_.pack(side='left')
frame3.pack()

tkm.Button(root, text="Oblicz", command=find_solutions, fg='white', width=200, height=30, bg="#5dade2", borderless=1).pack(pady=10)
res_ = tk.Label(root, bg='#2e4053')
res_.pack()

root.mainloop()