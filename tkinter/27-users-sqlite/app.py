import tkinter as tk
from tkinter import messagebox, ttk
import hashlib
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    password = Column(String(255))

engine = create_engine('sqlite:///users.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

class LoginApp:
    def __init__(self, root):
        self.root = root
        self.root.title("System logowania")
        self.root.geometry('400x350')
        self.root.resizable(False, False)

        self.center_window()
    
        self.main_frame = tk.Frame(root, padx=20, pady=20)
        self.main_frame.pack(expand=True, fill='both')
        
        self.show_login_screen()
        
    def center_window(self):
        self.root.update_idletasks()
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f'{width}x{height}+{x}+{y}')
        
    def clear_frame(self):
        for widget in self.main_frame.winfo_children():
            widget.destroy()
            
    def show_login_screen(self):
        self.clear_frame()
        
        ttk.Label(self.main_frame, text="Logowanie:").pack(pady=20)
        
        tk.Label(self.main_frame, text="E-mail:").pack(anchor='w', pady=(10,0))
        self.login_email = tk.Entry(self.main_frame, width=30)
        self.login_email.pack(pady=5)
        
        tk.Label(self.main_frame, text="Hasło:").pack(anchor='w', pady=(10,0))
        self.login_password = tk.Entry(self.main_frame, show='*', width=30)
        self.login_password.pack(pady=5)
        
        btn_frame = tk.Frame(self.main_frame)
        btn_frame.pack(pady=20)
        
        tk.Button(btn_frame, text="Zaloguj", command=self.login).pack(side='left', padx=5)
        tk.Button(btn_frame, text="Zarejestruj", command=self.show_registration_screen).pack(side='left', padx=5)
        
    def show_registration_screen(self):
        self.clear_frame()
        
        ttk.Label(self.main_frame, text="Rejestracja:").pack(pady=20)
        
        tk.Label(self.main_frame, text="E-mail:").pack(anchor='w', pady=(10,0))
        self.reg_email = tk.Entry(self.main_frame, width=30)
        self.reg_email.pack(pady=5)
        
        tk.Label(self.main_frame, text="Hasło:").pack(anchor='w', pady=(10,0))
        self.reg_password = tk.Entry(self.main_frame, show='*', width=30)
        self.reg_password.pack(pady=5)
        
        btn_frame = tk.Frame(self.main_frame)
        btn_frame.pack(pady=20)
        
        tk.Button(btn_frame, text="Zarejestruj", command=self.register).pack(side='left', padx=5)
        tk.Button(btn_frame, text="Powrót", command=self.show_login_screen).pack(side='left', padx=5)
        
    def show_dashboard(self, email):
        self.clear_frame()
        
        ttk.Label(self.main_frame, text="Panel użytkownika").pack(pady=20)
        ttk.Label(self.main_frame, text=f"Witaj, {email}!").pack(pady=10)
        
        ttk.Label(self.main_frame, text="Zalogowano pomyślnie\nTo jest przykładowy panel użytkownika.", justify='center').pack(pady=10)
        
        tk.Button(self.main_frame, text="Wyloguj", command=self.show_login_screen).pack(pady=20)
        
    def register(self):
        email = self.reg_email.get().strip()
        password = self.reg_password.get().strip()
        
        if not email or not password:
            messagebox.showerror("Błąd", "Proszę wypełnić wszystkie pola.")
            return
        
        if not ("@" in email and "." in email):
            messagebox.showerror("Błąd", "Proszę podać poprawny adres e-mail.")
            return
        
        session = Session()
        if session.query(Users).filter_by(email=email).first():
            messagebox.showerror("Błąd", "Użytkownik o podanym e-mailu już istnieje.")
            session.close()
            return
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        new_user = Users(email=email, password=hashed_password)
        session.add(new_user)
        session.commit()
        session.close()
        
        messagebox.showinfo("Sukces", "Rejestracja zakończona pomyślnie.")
        self.show_login_screen()
        
    def login(self):
        email = self.login_email.get().strip()
        password = self.login_password.get().strip()
        
        if not email or not password:
            messagebox.showerror("Błąd", "Proszę wypełnić wszystkie pola.")
            return
        
        session = Session()
        user = session.query(Users).filter_by(email=email).first()
        session.close()
        
        if not user:
            messagebox.showerror("Błąd", "Nieprawidłowy e-mail lub hasło.")
            return
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        if user.password != hashed_password: # type: ignore
            messagebox.showerror("Błąd", "Nieprawidłowy e-mail lub hasło.")
            return
        
        self.show_dashboard(email)
        
if __name__ == "__main__":
    root = tk.Tk()
    app = LoginApp(root)
    root.mainloop()