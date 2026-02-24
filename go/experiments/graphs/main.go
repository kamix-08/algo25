package main

import "fmt"

func main() {
	g1 := ReadFromFile("!g1.txt")

	if !g1.DfsRecursive(1,5) { panic("test failed") }
	if !g1.DfsRecursive(3,5) { panic("test failed") }
	if !g1.DfsRecursive(2,3) { panic("test failed") }

	if g1.DfsRecursive(1,6) { panic("test failed") }
	if g1.DfsRecursive(5,7) { panic("test failed") }
	if g1.DfsRecursive(8,10) { panic("test failed") }

	fmt.Println("all tests passed!")




	// h := &Heap{}

	// if _, err := h.GetMin(); err == nil { panic("test failed") }
	// if _, err := h.Pop(); err == nil { panic("test failed") }

	// h.Push(5)

	// if v, _ := h.GetMin(); v != 5 { panic("test failed") }
	// if v, _ := h.Pop(); v != 5 { panic("test failed") }
	// if _, err := h.Pop(); err == nil { panic("test failed") }

	// h.Push(5)
	// h.Push(3)
	// h.Push(8)

	// if v, _ := h.GetMin(); v != 3 { panic("test failed") }
	// if v, _ := h.Pop(); v != 3 { panic("test failed") }
	// if v, _ := h.GetMin(); v != 5 { panic("test failed") }

	// h.Push(2)
	// h.Push(2)
	// h.Push(1)

	// if v, _ := h.GetMin(); v != 1 { panic("test failed") }
	// if v, _ := h.Pop(); v != 1 { panic("test failed") }
	// if v, _ := h.GetMin(); v != 2 { panic("test failed") }
	// if v, _ := h.Pop(); v != 2 { panic("test failed") }
	// if v, _ := h.GetMin(); v != 2 { panic("test failed") }

	// h.Push(-1)
	// h.Push(-5)
	// h.Push(3)

	// if v, _ := h.GetMin(); v != -5 { panic("test failed") }
	// if v, _ := h.Pop(); v != -5 { panic("test failed") }
	// if v, _ := h.GetMin(); v != -1 { panic("test failed") }

	// h.Push(9)
	// h.Push(8)
	// h.Push(7)
	// h.Push(6)
	// h.Push(5)

	// fmt.Println("all tests passed!")




	g2 := ReadMatrixFromFile("!g2.txt")

	fmt.Println(g2.Dijkstra(1,5))
	fmt.Println(g2.Dijkstra(1,4))
	fmt.Println(g2.Dijkstra(3,5))
	fmt.Println(g2.Dijkstra(2,3))

	fmt.Println(g2.Dijkstra(6,8))
	fmt.Println(g2.Dijkstra(8,6))

	fmt.Println(g2.Dijkstra(9,10))
	fmt.Println(g2.Dijkstra(10,9))

	fmt.Println(g2.Dijkstra(1,8))
	fmt.Println(g2.Dijkstra(5,11))
	fmt.Println(g2.Dijkstra(11,11))
}