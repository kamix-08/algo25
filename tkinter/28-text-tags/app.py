import tkinter as tk

root = tk.Tk()
root.title('Text Tags')
root.geometry('300x200')

text = tk.Text(root, width=30, height=10)
text.pack(fill=tk.BOTH, expand=True)

text.insert(tk.END, 'lebron is the goat')
text.insert(tk.END, '\n')
text.insert(tk.END, 'lebron my king')

text.tag_add('tag1', '1.0', '1.6')
text.tag_config('tag1', background='yellow', foreground='black', font=('Arial', 12, 'bold'))

text.tag_add('tag2', '2.0', '2.6')
text.tag_config('tag2', background='lightblue', foreground='black', font=('Arial', 12, 'italic'))

root.mainloop()