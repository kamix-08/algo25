import tkinter as tk
from tkinter import ttk, messagebox
from PIL import ImageTk, Image
import os

class Root(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.title("Prosty Eksplorator Plików")
        self.geometry("600x400")
        
        folder_img = Image.open('icons/dir.png').resize((16,16))
        self.folder_icon = ImageTk.PhotoImage(folder_img)
        
        file_img = Image.open('icons/file.png').resize((16,16))
        self.file_icon = ImageTk.PhotoImage(file_img)
        
        self.tree = ttk.Treeview(self)
        self.tree.heading("#0", text="Pliki i foldery", anchor='w')
        self.tree.pack(fill='both', expand=True)
        
        scrollbar = ttk.Scrollbar(self.tree, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        scrollbar.pack(side='right', fill='y')
        
        start_path = os.getcwd()
        root_node = self.tree.insert('', 'end', text=start_path, open=True, values=[start_path], image=self.folder_icon)
        self.populate_tree(root_node, start_path)
        
        self.tree.bind('<<TreeviewOpen>>', self.open_node)
        self.tree.bind('<Double-1>', self.open_file)

    def populate_tree(self, parent, path):
        self.tree.delete(*self.tree.get_children(parent))
        
        for entry in os.listdir(path):
            full_path = os.path.join(path, entry)
            
            if os.path.isdir(full_path):
                node = self.tree.insert(parent, 'end', text=entry, values=[full_path], image=self.folder_icon)
                self.tree.insert(node, 'end')
            elif os.path.isfile(full_path):
                self.tree.insert(parent, 'end', text=entry, values=[full_path], image=self.file_icon)

    def get_node(self):
        node = self.tree.focus()
        path = self.tree.item(node)['values'][0]
        
        return node, path

    def open_node(self, event):
        node, path = self.get_node()
        
        if os.path.isdir(path):
            self.populate_tree(node, path)

    def open_file(self, event):
        _, path = self.get_node()
        
        if os.path.isfile(path):
            messagebox.showinfo('Otwieranie pliku', f'Wybrałeś plik {path}')

if __name__ == "__main__":
    app = Root()
    app.mainloop()