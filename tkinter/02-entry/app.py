import tkinter as tk

def submit():
    text = entry.get().strip()
    
    if text == "":
        result_label.config(text="Podaj teskst")
    else:
        result_label.config(text=f'Wypisałeś: {text}')

root = tk.Tk()
root.geometry("300x200")
root.title("Entry")

prompt_label = tk.Label(root, text='Wpisz dowolny teskt', font=("Arial", 14))
prompt_label.pack(pady=5)

entry = tk.Entry(root, font=("Arial", 14), width=25)
entry.pack(pady=5)

button = tk.Button(root, text='Pokaż tekst', font=("Verdana", 14), command=submit)
button.pack(pady=5)

result_label = tk.Label(root, font=("Arial", 14))
result_label.pack(pady=5)

root.mainloop()