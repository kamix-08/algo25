# Zadanie 1 — Galeria kształtów
# Imię i nazwisko: _______________
# Data: _______________

import tkinter as tk
import random

COLORS = ["#e74c3c", "#3498db", "#27ae60", "#f39c12",
          "#9b59b6", "#1abc9c", "#e67e22", "#2c3e50"]

n_elements = 0

def draw_shape(canvas, shape_type, label_count):
    x1 = random.randint(10, 490)
    y1 = random.randint(10, 340)
    x2 = random.randint(10, 490)
    y2 = random.randint(10, 340)
    color = random.choice(COLORS)

    if shape_type == "line":
        canvas.create_line(x1, y1, x2, y2, fill=color, width=2)
    elif shape_type == "rectangle":
        canvas.create_rectangle(x1, y1, x2, y2, outline=color, width=2)
    elif shape_type == "oval":
        canvas.create_oval(x1, y1, x2, y2, outline=color, width=2)
    elif shape_type == "polygon":
        n_points = random.randint(3, 6)
        points = [x1, y1, x2, y2] + [random.randint(10, 490) for _ in range((n_points - 2) * 2)]
        canvas.create_polygon(points, outline=color, fill="", width=2)
        
    global n_elements
    n_elements += 1
    label_count.config(text=f"Liczba elementów: {n_elements}")

def clear_canvas(canvas, label_count):
    canvas.delete("all")
    global n_elements
    n_elements = 0
    label_count.config(text="Liczba elementów: 0")

def delete_shape(canvas, event, label_count):
    item = canvas.find_closest(event.x, event.y)
    if item:
        canvas.delete(item)
        global n_elements
        n_elements -= 1
        label_count.config(text=f"Liczba elementów: {n_elements}")

def create_window():
    window = tk.Tk()
    window.title("Galeria kształtów")
    window.geometry("520x430")
    window.resizable(False, False)

    # TODO: Przyciski: "Linia", "Prostokąt", "Owal", "Wielokąt", "Wyczyść"
    btn_line = tk.Button(window, text="Linia")
    btn_rectangle = tk.Button(window, text="Prostokąt")
    btn_oval = tk.Button(window, text="Owal")
    btn_polygon = tk.Button(window, text="Wielokąt")
    btn_clear = tk.Button(window, text="Wyczyść")
    
    btn_line.pack(side=tk.TOP, fill=tk.X)
    btn_rectangle.pack(side=tk.TOP, fill=tk.X)
    btn_oval.pack(side=tk.TOP, fill=tk.X)
    btn_polygon.pack(side=tk.TOP, fill=tk.X)
    btn_clear.pack(side=tk.TOP, fill=tk.X)
    
    # TODO: Label z liczbą narysowanych elementów
    label_count = tk.Label(window, text="Liczba elementów: 0")
    label_count.pack(side=tk.TOP, fill=tk.X)

    # TODO: Canvas z białym tłem
    canvas = tk.Canvas(window, bg="white")
    canvas.pack(fill=tk.BOTH, expand=True)

    # TODO: Każdy przycisk rysuje kształt w losowym miejscu
    #       z losowym kolorem z listy COLORS
    btn_line.config(command=lambda: draw_shape(canvas, "line", label_count))
    btn_rectangle.config(command=lambda: draw_shape(canvas, "rectangle", label_count))
    btn_oval.config(command=lambda: draw_shape(canvas, "oval", label_count))
    btn_polygon.config(command=lambda: draw_shape(canvas, "polygon", label_count))
    btn_clear.config(command=lambda: clear_canvas(canvas, label_count))

    # TODO: Prawy klik na kształt — usuwa go
    # hint: canvas.find_closest(event.x, event.y)
    #        canvas.delete(item)
    canvas.bind("<Button-3>", lambda event: delete_shape(canvas, event, label_count))

    return window

if __name__ == "__main__":
    window = create_window()
    window.mainloop()
