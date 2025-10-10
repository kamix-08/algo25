import tkinter as tk
from tkinter import ttk

class Root(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.title("Przykład tabeli - Treeview")
        self.geometry("500x300")
        
        tk.Label(self, text='Lista samochodów', font=("Arial", 14)).pack(pady=10)
        
        columns = ['marka', 'model', 'rok']
        self.table = ttk.Treeview(self, columns=columns, show='headings', height=8)
        
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
            
        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.table.yview)
        self.table.configure(yscrollcommand=scrollbar.set)
            
        self.table.pack(side='left', fill='both', expand=True, padx=(20, 0))
        scrollbar.pack(side='right', fill='y')
        
if __name__ == "__main__":
    app = Root()
    app.mainloop()