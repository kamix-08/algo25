import tkinter as tk
from tkinter import messagebox

root = tk.Tk()
root.configure(bg='#4d4d4d')
root.title('Tic Tac Toe')
root.geometry('300x420')
root.resizable(False, False)

res = tk.Label(root, bg='#4d4d4d', fg='white', font=('Arial', 16))
res.pack()

n1 = tk.Entry(root, width=41, bg='#474747', fg='white', relief='flat', insertbackground='white', highlightbackground='white', highlightthickness=1)
n1.pack(pady=5)

n2 = tk.Entry(root, width=41, bg='#474747', fg='white', relief='flat', insertbackground='white', highlightbackground='white', highlightthickness=1)
n2.pack()

moveX = True
finished = False

def check():
    global finished
    finished = True
    
    for row in gridStaus:
        if row[0] == row[1] == row[2] != '.':
            return row[0]
        
    for col in range(3):
        if gridStaus[0][col] == gridStaus[1][col] == gridStaus[2][col] != '.':
            return gridStaus[0][col]
        
    if gridStaus[0][0] == gridStaus[1][1] == gridStaus[2][2] != '.':
        return gridStaus[0][0]
    
    if gridStaus[0][2] == gridStaus[1][1] == gridStaus[2][0] != '.':
        return gridStaus[0][2]
    
    for row in gridStaus:
        for cell in row:
            if cell == '.':
                finished = False
                return '.'
    
    return '='

def place(x,y):
    global moveX
    
    if not n1.get() or not n2.get():
        messagebox.showwarning('Brak danych', 'Uzupełnij dane, aby rozpocząć!')
        return
    
    if finished or gridStaus[y][x] != '.':
        return
    
    gridStaus[y][x] = 'x' if moveX else 'o'
    grid[y][x].config(text='X' if moveX else 'O')
    
    w = check()
    if w != '.':
        if w == '=':
            res.config(text='Remis!')
            return
        
        res.config(text=(n1 if w == 'x' else n2).get() + ' wygrał!')
        return
    
    moveX = not moveX

gridFrame = tk.Frame(root, bg='#4d4d4d')
gridFrame.pack(pady=15)

grid = []
gridStaus = [['.' for _ in range(3)] for _ in range(3)]

for y in range(3):
    grid.append([])
    
    for x in range(3):
        a = tk.Button(gridFrame, command=lambda x=x, y=y: place(x,y), width=10, height=5, bg='#474747', fg='white', relief='solid')
        a.grid(column=x, row=y, padx=2, pady=2)
        
        grid[-1].append(a)
        
def restart():
    global moveX, finished, gridStaus
    
    res.config(text='')
    moveX = True
    finished = False
    gridStaus = [['.' for _ in range(3)] for _ in range(3)]
    
    for row in grid:
        for btn in row:
            btn.config(text='')
            
    n1.delete(0, tk.END)
    n2.delete(0, tk.END)
        
tk.Button(root, text='Nowa gra', width=35, command=restart, bg='#2cbb53', fg='white', relief='flat').pack()

root.mainloop()