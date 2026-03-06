import tkinter as tk

root = tk.Tk()
root.title('After')
root.geometry('300x200')

label = tk.Label(root, text='0')
label.pack(pady=20)

counter = 0

def update():
    global counter
    counter += 1
    label.config(text=str(counter))
    root.after(1000, update)

update()
root.mainloop()