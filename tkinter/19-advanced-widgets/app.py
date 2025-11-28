import tkinter as tk
from tkinter import ttk, messagebox
import json, os

class TaskManager():
    def __init__(self, root):
        self.root = root
        self.root.title("Menedżer zadań")
        self.root.geometry("500x400")
        
        self.root.protocol('WM_DELETE_WINDOW', self.save_json)
        self.file = '!data.json'
        self.colors = {
            "done"   : "green",
            "working": "orange",
            "todo"   : "red"
        }
        self.tasks = self.read_json()
        
        self.paned = ttk.PanedWindow(self.root, orient='horizontal')
        self.paned.pack(fill='both', expand=True, padx=10, pady=10)
        
        left_frame  = ttk.Frame(self.paned)
        right_frame = ttk.Frame(self.paned)
        
        self.paned.add(left_frame)
        self.paned.add(right_frame)
        
        self.task_list = tk.Listbox(left_frame, height=15)
        scrollbar = ttk.Scrollbar(left_frame, orient='vertical', command=self.task_list.yview)
        self.task_list.config(yscrollcommand=scrollbar) # type: ignore
        self.task_list.pack(side='left', fill='both', expand=True)
        scrollbar.pack(side='right', fill='y')
        
        ttk.Label(right_frame, text='Nowe zadanie').pack(pady=5)
        self.entry = tk.Entry(right_frame)
        self.entry.pack(pady=5, fill='x')
        
        ttk.Button(right_frame, text='Dodaj zadanie'  , command=self.add_task    ).pack(pady=5)
        ttk.Button(right_frame, text='Usuń zaznaczone', command=self.delete_task ).pack(pady=5)
        ttk.Button(right_frame, text='Szczegóły'      , command=self.show_details).pack(pady=5)
        
        ttk.Button(right_frame, text='Oznacz jako zrobione'    , command=lambda: self.set_status('done'   )).pack(pady=5)
        ttk.Button(right_frame, text='Oznacz jako w trakcie'   , command=lambda: self.set_status('working')).pack(pady=5)
        ttk.Button(right_frame, text='Oznacz jako do zrobienia', command=lambda: self.set_status('todo'   )).pack(pady=5)
        
        for task in self.tasks:
            self.add_task(task)
        
    def add_task(self, og_task = None):
        task = og_task
        if not task:
            task = {
                "text": self.entry.get().strip(),
                "status": "todo"
            }
        
        if task["text"]:
            self.task_list.insert('end', task["text"])
            self.entry.delete(0, 'end')
            self.task_list.itemconfig('end', bg=self.colors[task["status"]])
            
            if og_task is None:
                self.tasks.append(task)
            
        else:
            messagebox.showwarning('Uwaga', 'Wpisz treść zadania!')
            
    def delete_task(self):
        selected = self.task_list.curselection()
        
        if selected:
            self.task_list.delete(selected)
            self.tasks.pop(selected[0])
        
        else:
            messagebox.showinfo('Informacja', 'Nie wybrano żadnego zadania do usunięcia')
            
    def show_details(self):
        selected = self.task_list.curselection()
        
        if not selected:
            messagebox.showinfo('Informacja', 'Wybierz zadanie, aby zobaczyć szczegóły')
            return
        
        task_name = self.task_list.get(selected)
        top = tk.Toplevel(self.root)
        top.title("Szczegóły zadania")
        top.geometry("300x200")
        
        ttk.Label(top, text=f"Szczegóły zadania {task_name}").pack(pady=10)
        ttk.Label(top, text=task_name).pack(pady=5)
        ttk.Button(top, text='Zamknij', command=top.destroy).pack(pady=10)
        
    def set_status(self, status):
        selected = self.task_list.curselection()
        
        if not selected:
            messagebox.showinfo('Informacja', 'Wybierz zadanie, aby zmienić jego status')
            return
        
        self.tasks[selected[0]]["status"] = status
        self.task_list.itemconfig(selected[0], bg=self.colors[status])
        
    def save_json(self):
        with open(self.file, 'w') as f:
            json.dump(self.tasks, f)
            
        self.root.quit()
        
    def read_json(self):
        if not os.path.exists(self.file):
            return []
        
        with open(self.file, 'r', encoding='utf8') as f:
            return json.load(f)
        
if __name__ == "__main__":
    root = tk.Tk()
    app = TaskManager(root)
    root.mainloop()