import tkinter as tk

def show_value(value):
    result_label.config(text=f'Głośność: {value}')

root = tk.Tk()
root.title("Przykład Slidera (Scale)")
root.geometry("300x200")

label = tk.Label(root, text='Ustaw głośność: ', font=("Arial", 12))
label.pack(pady=10)

slider = tk.Scale(root, from_=0, to=100, orient='horizontal', length=200, font=("Arial", 14), command=show_value)
slider.pack(pady=10)
slider.set(50)

result_label = tk.Label(root, text='Głośność 50%', font=("Arial", 12))
result_label.pack(pady=10)

root.mainloop()