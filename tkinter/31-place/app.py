import tkinter as tk

root = tk.Tk()
root.title('Place')
root.geometry('300x200')

label1 = tk.Label(root, text='Label 1', bg='red')
label1.place(x=50, y=50)

label2 = tk.Label(root, text='Label 2', bg='blue')
label2.place(x=150, y=100)

root.mainloop()