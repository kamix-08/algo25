import tkinter as tk
from tkinter import filedialog, messagebox, font, colorchooser

txt_files = ('Pliki tekstowe', '*.txt')
all_files = ('Wszystkie pliki', '*.*')

def new_file():
    text_area.delete(1.0, 'end')
    
def open_file():
    file_path = filedialog.askopenfilename(filetypes=[
        txt_files, 
        all_files
    ])
    
    if not file_path:
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        text_area.delete(1.0, 'end')
        text_area.insert(1.0, content)
        
def save_file():
    file_path = filedialog.asksaveasfilename(defaultextension='*.txt', filetypes=[
        txt_files,
        all_files
    ])
    
    if not file_path:
        return
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text_area.get(1.0, 'end'))
        
    messagebox.showinfo('Zapisano', f'Plik zapisano jako: {file_path}')

def about():
    messagebox.showinfo('O notatniku', 'Prosty notatnik w Tkinter.\nAutor: Kamil')

def update_font(*args):
    current_font = font.Font(family=font_family.get(), size=font_size.get(), weight='normal')
    text_area.config(font=current_font)
    
def change_text_color():
    color = colorchooser.askcolor(title='Wybierz kolor tekstu')
    if color[1]:
        text_area.config(fg=color[1])
    
def change_bg_color():
    color = colorchooser.askcolor(title='Wybierz kolor tła')
    if color[1]:
        text_area.config(bg=color[1])

root = tk.Tk()
root.title("Notepad")
root.geometry("600x400")

menu_bar = tk.Menu(root)
root.config(menu=menu_bar)

file_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label='Plik', menu=file_menu)

file_menu.add_command(label='Nowy', command=new_file)
file_menu.add_command(label='Otwórz', command=open_file)
file_menu.add_command(label='Zapisz jako', command=save_file)
file_menu.add_separator()
file_menu.add_command(label='Wyjdź', command=root.quit)

edit_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label='Edycja', menu=edit_menu)

edit_menu.add_command(label='Cofnij', command=lambda: text_area.event_generate('<<Undo>>'))
edit_menu.add_command(label='Ponów', command=lambda: text_area.event_generate('<<Redo>>'))
edit_menu.add_separator()
edit_menu.add_command(label='Wytnij', command=lambda: text_area.event_generate('<<Cut>>'))
edit_menu.add_command(label='Kopiuj', command=lambda: text_area.event_generate('<<Copy>>'))
edit_menu.add_command(label='Wklej', command=lambda: text_area.event_generate('<<Paste>>'))
edit_menu.add_command(label='Usuń', command=lambda: text_area.delete('sel.first', 'sel.last'))

format_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label='Format', menu=format_menu)

format_menu.add_command(label='Zmień kolor tekstu', command=change_text_color)
format_menu.add_command(label='Zmień kolor tła', command=change_bg_color)

help_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label='Pomoc', menu=help_menu)

help_menu.add_command(label='O programie', command=about)

toolbar = tk.Frame(root)
toolbar.pack(side='top', fill='x')

avaiable_fonts = ['Arial', 'Verdana', 'Courier', 'Comic Sans MS', 'Times New Roman', 'Spring', 'Courier New']
font_family = tk.StringVar(value=avaiable_fonts[0])
font_menu = tk.OptionMenu(toolbar, font_family, *avaiable_fonts, command=update_font)
font_menu.pack(side='left', padx=5, pady=5)

avaiable_sizes = [*range(8, 20, 2), *range(20, 32+1, 4)]
font_size = tk.IntVar(value=avaiable_sizes[0])
size_menu = tk.OptionMenu(toolbar, font_size, *avaiable_sizes, command=update_font) # type: ignore
size_menu.pack(side='left', pady=5)

text_area = tk.Text(root, wrap='word', undo=True)
scrollbar = tk.Scrollbar(root, command=text_area.yview)
text_area.config(yscrollcommand=scrollbar.set)

text_area.pack(side='left', fill='both', expand=True)
scrollbar.pack(side='right', fill='y')

root.mainloop()