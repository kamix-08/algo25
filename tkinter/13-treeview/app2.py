import tkinter as tk
from tkinter import ttk

class Root(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.title("Przykład tabeli - Treeview")
        self.geometry("500x300")
        
        notebook = ttk.Notebook(self)
        notebook.pack(fill='both', expand=True)
        
        frame1 = ttk.Frame(notebook)
        notebook.add(frame1, text='Samochody')
        
        columns = ['marka', 'model', 'rok']
        self.table = ttk.Treeview(frame1, columns=columns, show='headings', height=8)
        
        self.table.heading('marka', text='Marka')
        self.table.heading('model', text='Model')
        self.table.heading('rok'  , text='Rok'  )
        
        self.table.column('marka', width=150, anchor='center')
        self.table.column('model', width=200, anchor='center')
        self.table.column('rok'  , width=100, anchor='center')
        
        cars = [
            ('Toyota', 'Corolla', 2000),
            ('BMW', 'X7', 2025),
            ('Audi', 'Q5', 2020),
            ('Skoda', 'Oktavia', 2000),
            ('Seat', 'Ibiza', 2005),
            ('Audi', 'A4', 2002),
            ('Seat', 'Leon', 2003),
        ]
        
        for car in cars:
            self.table.insert('', 'end', values=car)
            
        frame2 = ttk.Frame(notebook)
        notebook.add(frame2, text='Pracownicy')
        
        emp_columns = ['imię', 'nazwisko', 'stanowsiko']
        emp_table = ttk.Treeview(frame2, columns=emp_columns, show='headings', height=8)
        
        for emp in emp_columns:
            emp_table.heading(emp, text=emp.capitalize())
            
        emp_table.pack(pady=10, padx=10, fill='both', expand=True)
            
        employees = [
            ('Jan', 'Kowalski', 'Administrator'),
            ('Michał', 'Nowak', 'Programista'),
            ('Piotr', 'Polak', 'DevOps')
        ]
        
        for employee in employees:
            emp_table.insert('', 'end', values=employee)
            
        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.table.yview)
        self.table.configure(yscrollcommand=scrollbar.set)
            
        self.table.pack(side='left', fill='both', expand=True, padx=(20, 0))
        scrollbar.pack(side='right', fill='y')
        
if __name__ == "__main__":
    app = Root()
    app.mainloop()