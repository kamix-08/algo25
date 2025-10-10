import tkinter as tk
from tkinter import ttk

class Root(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.title("Spinbox - wybór miesiąca")
        self.geometry("300x200")
        
        months = [
            "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ]
        
        tk.Label(self, text='Wybierz miesiąc:').pack(pady=10)
        
        self.spin_var = tk.StringVar(value=months[0])
        
        ttk.Spinbox(
            self, 
            textvariable=self.spin_var, 
            values=months, 
            width=12,
            state='readonly'
        ).pack(pady=10)
        
        ttk.Button(self, text='Pokaż wybór', command=self.show_res).pack(pady=10)
        
        self.result = tk.Label(self)
        self.result.pack(pady=10)
        
    def show_res(self):
            self.result.config(text=f"Wybrałeś: {self.spin_var.get()}")
        
if __name__ == "__main__":
    app = Root()
    app.mainloop()