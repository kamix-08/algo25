import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.geometry("500x550")
root.title("Quiz Informatyczny")

lb1 = tk.Label(root, text='Podsumowanie dla: ')
lb2 = tk.Label(root, text='Poziom trudności: ')
lb3 = tk.Label(root, text='Tematy: ')
lb4 = tk.Label(root, text='Wybrana odpowiedź: ')
lb5 = tk.Label(root, text='Czas na odpowiedź: ')

for lb in [lb1, lb2, lb3, lb4, lb5]:
    lb.pack()
    
tk.Label(root, text='Imię:').pack(anchor='w', pady=5, padx=15)

entry = tk.Entry(root)
entry.pack()

tk.Label(root, text='Poziom trudności:').pack(anchor='w', pady=5, padx=15)

combo = ttk.Combobox(root, values=['Łatwy', 'Średni', 'Trudny'], state='readonly')
combo.pack()

tk.Label(root, text='Wybierz preferowane tematy:').pack(anchor='w', pady=5, padx=15)

cbs = {}
def add_cb(text):
    var = tk.BooleanVar()
    
    cb = tk.Checkbutton(root, text=text, variable=var)
    cb.pack(padx=30, anchor='w')
    
    cbs[text] = var
    
add_cb('Sieci komputerowe')
add_cb('Programowanie')
add_cb('Cyberbezpieczeństwo')

tk.Label(root, text='Pytanie: Który język nadaje się do programowania?').pack(anchor='w', pady=5, padx=15)

ans_var = tk.StringVar()
rbs = {}

def add_rb(text):
    rb = tk.Radiobutton(root, text=text, value=text, variable=ans_var)
    rb.pack(padx=30, anchor='w')
    
    rbs[text] = rb
    
add_rb('Python')
add_rb('HTML')
add_rb('Excel')

t_lb = tk.Label(root, text='Czas na odpowiedź: ')
t_lb.pack()

slider = tk.Scale(root, from_=0, to=120, orient='horizontal', length=400, tickinterval=10)
slider.pack()

def show_summary():
    lb1.config(text=f'Podsumowanie dla: {entry.get()}')
    lb2.config(text=f'Poziom trudności: {combo.get()}')
    lb3.config(text=f'Tematy: {', '.join([key for key, value in cbs.items() if value.get()])}')
    lb4.config(text=f'Wybrana odpowiedź: {ans_var.get()}')
    
    lb5.config(text=f'Czas na odpowiedź: {slider.get()} sekund')
    t_lb.config(text=f'Czas na odpowiedź: {slider.get()} sekund')

btn = tk.Button(root, text='Pokaż podsumowanie', command=show_summary)
btn.pack(pady=15)

root.mainloop()