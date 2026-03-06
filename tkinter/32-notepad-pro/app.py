import tkinter as tk
from tkinter import ttk, messagebox
import json, os

DATA_FILE = '!notes.json'

class NotepadModel:
    def __init__(self):
        self.notes = []
        self.load()
        
    def load(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                self.notes = json.load(f)
                
    def save(self):
        with open(DATA_FILE, 'w') as f:
            json.dump(self.notes, f)
            

    def add(self, note):
        self.notes.append(note)
        self.save()
        
    def delete(self, index):
        del self.notes[index]
        self.save()
        
class NotesApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('Notepad Pro')
        self.geometry('400x300')
        
        self.model = NotepadModel()
        
        self.build_ui()
        self.refresh_list()
        
    def build_ui(self):
        main = ttk.PanedWindow(self)
        main.pack(fill=tk.BOTH, expand=True)
        
        left = ttk.Frame(main)
        main.add(left, weight=1)
        
        self.listbox = tk.Listbox(left)
        self.listbox.pack(fill=tk.BOTH, expand=True)
        
        right = ttk.Frame(main)
        main.add(right, weight=0)
        
        self.entry = ttk.Entry(right)
        self.entry.pack(pady=10)
        
        add_btn = ttk.Button(right, text='Add Note', command=self.add_note)
        add_btn.pack(pady=5)
        
        del_btn = ttk.Button(right, text='Delete Note', command=self.delete_note)
        del_btn.pack(pady=5)
        
    def refresh_list(self):
        self.listbox.delete(0, tk.END)
        for note in self.model.notes:
            self.listbox.insert(tk.END, note)
            
    def add_note(self):
        note = self.entry.get().strip()
        if note:
            self.model.add(note)
            self.refresh_list()
            self.entry.delete(0, tk.END)
        else:
            messagebox.showwarning('Warning', 'Note cannot be empty!')
            
    def delete_note(self):
        index = self.listbox.curselection()
        if index:
            self.model.delete(index[0])
            self.refresh_list()
        else:
            messagebox.showwarning('Warning', 'No note selected!')
            
if __name__ == '__main__':
    app = NotesApp()
    app.mainloop()