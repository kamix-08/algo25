import tkinter as tk

def display():
    result = "Wybrane:\n"

    if var1.get(): result += "- A\n"
    if var2.get(): result += "- B\n"
    if var3.get(): result += "- C\n"
    
    if not (var1.get() or var2.get() or var3.get()):
        result += "- brak lol\n"
        
    result_label.config(text=result)

root = tk.Tk()
root.geometry("300x400")
root.title("Checkbox")

var1 = tk.BooleanVar()
var2 = tk.BooleanVar()
var3 = tk.BooleanVar()

cb1 = tk.Checkbutton(root, text='A', variable=var1, font=("Arial", 12))
cb1.pack(anchor='w', pady=5)

cb2 = tk.Checkbutton(root, text='B', variable=var2, font=("Arial", 12))
cb2.pack(anchor='w', pady=5)

cb3 = tk.Checkbutton(root, text='C', variable=var3, font=("Arial", 12))
cb3.pack(anchor='w', pady=5)

button = tk.Button(root, text='Pokaż wybrane', font=("Arial", 12), command=display)
button.pack(pady=10)

result_label = tk.Label(root, font=("Arial", 12))
result_label.pack(pady=10)

root.mainloop()