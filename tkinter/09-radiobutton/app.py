import tkinter as tk

root = tk.Tk()
root.geometry("300x300")
root.title("Radiobutton")

tk.Label(root, text='Wybierz rodzaj paliwa:', font=("Arial", 12)).pack(pady=10)

fuel_var = tk.StringVar()

rbs = {}
def add_rb(text):
    rb = tk.Radiobutton(root, text=text, variable=fuel_var, value=text, font=("Arial", 12))
    rb.pack(pady=5, anchor='w')
    
    rbs[text] = rb
    
add_rb("Benzyna")
add_rb("Diesel")
add_rb("Elektryczny")
add_rb("Hybryda")

def show_selection():
    choice = fuel_var.get()
    if choice == '':
        result_label.config(text='Nie wybrałeś rodzaju paliwa!')
    else:
        result_label.config(text=f'Wybrałeś: {choice}')

button = tk.Button(root, text='Pokaż wybór', font=("Arial", 12), command=show_selection)
button.pack(pady=15)

result_label = tk.Label(root, font=("Arial", 12))
result_label.pack(pady=5)

root.mainloop()