import tkinter as tk
from tkinter import ttk, messagebox, colorchooser
import json
import os

DATA_FILE = "!02_notes.json"

# --- model ---
class NotesModel:
    def __init__(self):
        self.notes = []
        self.load()

    def add(self, title, content, tag, color):
        self.notes.append({
            "title": title,
            "content": content,
            "tag": tag,
            "color": color
        })
        self.save()

    def save(self):
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(self.notes, f, indent=2, ensure_ascii=False)

    def load(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                self.notes = json.load(f)

# --- edytor ---
class EditorWindow(tk.Toplevel):
    def __init__(self, parent, save_callback, note=None):
        super().__init__(parent)
        self.title("Edytor Notatki")
        self.geometry("400x500")
        self.save_callback = save_callback

        ttk.Label(self, text='Tytuł:').pack()
        self.title_entry = ttk.Entry(self)
        self.title_entry.pack(fill='x')

        ttk.Label(self, text='Tag:').pack()
        self.tag_entry = ttk.Entry(self)
        self.tag_entry.pack(fill='x')

        ttk.Label(self, text='Treść:').pack()
        self.text = tk.Text(self)
        self.text.pack(fill='both', expand=True)

        self.color = '#ffffff'
        ttk.Button(self, text='Kolor', command=self.choose_color).pack(pady=5)
        ttk.Button(self, text='Zapisz', command=self.save).pack()

    def choose_color(self):
        self.color = colorchooser.askcolor()[1]

    def save(self):
        self.save_callback(
            self.title_entry.get(),
            self.text.get('1.0', tk.END),
            self.tag_entry.get(),
            self.color
        )
        self.destroy()


# --- app ---
class NotesApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Notepad Pro")
        self.root.geometry("700x400")

        self.model = NotesModel()

        self.search_var = tk.StringVar()
        self.search_var.trace_add('write', lambda *args: self.refresh())

        self.build_ui()
        self.refresh()

        self.root.after(3000, self.autosave)

    def build_ui(self):
        top = ttk.Frame(self.root)
        top.pack(fill='x')

        ttk.Label(top, text='Szukaj:').pack(side='left')
        ttk.Entry(top, textvariable=self.search_var).pack(side='left', fill='x', expand=True)
        ttk.Button(top, text='Nowa', command=self.new_note).pack(side='left')

        self.tree = ttk.Treeview(self.root, columns=('title', 'tag'), show="headings")
        self.tree.heading('title', text='Tytuł')
        self.tree.heading('tag', text='Tag')
        self.tree.column('title', width=180)
        self.tree.column('tag', width=100)
        self.tree.pack(side='left', fill='y')
        self.tree.bind("<<TreeviewSelect>>", self.show_preview)

        self.preview = tk.Text(self.root)
        self.preview.pack(fill='both', expand=True)

    def refresh(self):
        self.tree.delete(*self.tree.get_children())
        for i, note in enumerate(self.model.notes):
            if self.search_var.get().lower() in note['title'].lower():
                self.tree.insert('', 'end', iid=i, values=(note['title'], note['tag']), tags=(str(i)))
                self.tree.tag_configure(str(i), background=note['color'])

    def show_preview(self, event):
        if not self.tree.selection():
            return

        idx = int(self.tree.selection()[0])
        note = self.model.notes[idx]
        self.preview.delete('1.0', tk.END)
        self.preview.insert(tk.END, note['content'])
        self.preview.config(bg=note['color'])

    def new_note(self):
        EditorWindow(self.root, self.save_note)

    def save_note(self, title, content, tag, color):
        self.model.add(title, content, tag, color)
        self.refresh()

    def update_note(self, idx, title, content, tag, color):
        self.model.notes[idx] = {
            "title": title,
            "content": content,
            "tag": tag,
            "color": color
        }
        self.refresh()

    def autosave(self):
        self.model.save()
        self.root.after(3000, self.autosave)

root = tk.Tk()
NotesApp(root)
root.mainloop()