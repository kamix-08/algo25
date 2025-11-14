import tkinter as tk
from tkinter import colorchooser, filedialog
from PIL import Image, ImageDraw

def start_draw(event):
    global last_x, last_y
    last_x, last_y = event.x, event.y
    
def draw(event):
    global last_x, last_y, shape_id
    
    assert type(last_x) == float or type(last_x) == int, type(last_x)
    assert type(last_y) == float or type(last_y) == int, type(last_y)

    if mode.get() == 'Pędzel':
        canvas.create_line(last_x, last_y, event.x, event.y, fill=pen_color, width=pen_size)
        draw_image.line((last_x, last_y, event.x, event.y), fill=pen_color, width=pen_size)
        last_x, last_y = event.x, event.y
        
    else:
        if shape_id:
            canvas.delete(shape_id)
            
        if mode.get() == 'Linia':
            shape_id = canvas.create_line(last_x, last_y, event.x, event.y, width=pen_size, fill=pen_color)
        elif mode.get() == 'Prostokąt':
            shape_id = canvas.create_rectangle(last_x, last_y,  event.x, event.y, outline=pen_color, width=pen_size)
        elif mode.get() == 'Elipsa':
            shape_id = canvas.create_oval(last_x, last_y, event.x, event.y, width=pen_size, outline=pen_color)
    
def finalize_shape(event):
    global shape_id
    
    assert type(last_x) == float or type(last_x) == int, type(last_x)
    assert type(last_y) == float or type(last_y) == int, type(last_y)
    
    if mode.get() == 'Linia':
        draw_image.line((last_x, last_y, event.x, event.y), fill=pen_color, width=pen_size)
    elif mode.get() == 'Prostokąt':
        draw_image.rectangle((last_x, last_y, event.x, event.y), outline=pen_color, width=pen_size)
    elif mode.get() == 'Elipsa':
        draw_image.ellipse((last_x, last_y, event.x, event.y), outline=pen_color, width=pen_size)
    
    shape_id = None
    
def change_color():
    global pen_color
    color = colorchooser.askcolor(title='Wybierz kolor pędzla')
    if color[1]:
        pen_color = color[1]
    
def change_size(value):
    global pen_size
    pen_size = int(value)
    
def clear():
    global image, draw_image
    canvas.delete('all')
    image = Image.new('RGB',(800,600), (255,255,255))
    draw_image = ImageDraw.Draw(image)
    
def save_image():
    file_path = filedialog.asksaveasfilename(defaultextension='.png', filetypes=[('Pliki *.png', '*.png')])
    if file_path:
        image.save(file_path)

root = tk.Tk()
root.title("Prosta Farba")
root.geometry("800x600")

pen_color = "black"
pen_size = 3
last_x, last_y = None, None
shape_id = None

image = Image.new('RGB', (800,600), (255,255,255))
draw_image = ImageDraw.Draw(image)

toolbar = tk.Frame(root)
toolbar.pack(side='top', fill='x')

btn_color = tk.Button(toolbar, text='Kolor', command=change_color)
btn_color.pack(side='left', padx=5, pady=5)

btn_clear = tk.Button(toolbar, text='Wyczyść', command=clear)
btn_clear.pack(side='left', padx=5, pady=5)

btn_save = tk.Button(toolbar, text='Zapisz', command=save_image)
btn_save.pack(side='left', padx=5, pady=5)

size_scale = tk.Scale(toolbar, from_=1, to=20, orient='horizontal', label='Rozmiar pędzla', command=change_size)
size_scale.set(pen_size)
size_scale.pack(side='left', padx=5, pady=5)

modes = ['Pędzel', 'Linia', 'Prostokąt', 'Elipsa']
mode = tk.StringVar(value=modes[0])
for m in modes:
    tk.Radiobutton(toolbar, text=m, variable=mode, value=m).pack(side='left', padx=5)

canvas = tk.Canvas(root, bg='white')
canvas.pack(side='top', expand=True)

canvas.bind('<Button-1>', start_draw)
canvas.bind('<B1-Motion>', draw)
canvas.bind('<ButtonRelease-1>', finalize_shape)

root.mainloop() 