import tkinter as tk
from tkinter import messagebox

def calculate(operation):
    try:
        num1 = float(entry1.get())
        num2 = float(entry2.get())
        
        match operation:
            case '+': res = num1 + num2
            case '-': res = num1 - num2
            case '*': res = num1 * num2
            case '/': res = num1 / num2
            case  _ : res = 'Nieznane działanie'
            
        result_label.config(text=f'Wynik: {res}')
            
    except ZeroDivisionError:
        messagebox.showerror('Błąd', 'Nie można dzielić przez 0')
        
    except ValueError:
        messagebox.showerror('Błąd', 'Wprowadź poprawne liczby')
        
root = tk.Tk()
root.title("Prosty kalkulator")
root.geometry("350x250")

tk.Label(root, text="Pierwsza liczba", font=("Arial", 12)).pack(pady=5)
entry1 = tk.Entry(root, font=("Arial", 12))
entry1.pack(pady=5)

tk.Label(root, text="Druga liczba", font=("Arial", 12)).pack(pady=5)
entry2 = tk.Entry(root, font=("Arial", 12))
entry2.pack(pady=5)

frame = tk.Frame(root)
frame.pack(pady=10)

btn_add = tk.Button(frame, text='+', width=5, font=("Arial", 12), command=lambda: calculate('+'))
btn_add.grid(row=0, column=0, padx=5, pady=5)

btn_sub = tk.Button(frame, text='-', width=5, font=("Arial", 12), command=lambda: calculate('-'))
btn_sub.grid(row=0, column=1, padx=5, pady=5)

btn_mul = tk.Button(frame, text='*', width=5, font=("Arial", 12), command=lambda: calculate('*'))
btn_mul.grid(row=0, column=2, padx=5, pady=5)

btn_div = tk.Button(frame, text='/', width=5, font=("Arial", 12), command=lambda: calculate('/'))
btn_div.grid(row=0, column=3, padx=5, pady=5)

result_label = tk.Label(root, text="Wynik: ", font=("Arial", 14))
result_label.pack(pady=10)

root.mainloop()