package main

import "fmt"

func main() {
	list := newLinkedListSingle(5.0, 6.7, 9.1, 3.2)

	fmt.Println(list) // [ 5.0 6.7 9.1 3.2 ]

	list.InsertBack(8.1)
	list.InsertFront(1.0)
	list.InsertIndex(3, 0.2)

	fmt.Println(list) // [ 1.0 5.0 6.7 0.2 9.1 3.2 8.1 ]

	fmt.Println(list.At(4)) // (9.1, nil)

	list.DeleteAt(1)
	list.InsertBack(4.1)
	list.InsertBack(4.1)

	fmt.Println(list.Size()) // 8

	list.DeleteValue(6.7)
	list.DeleteAll(4.1)

	fmt.Println(list) // [ 1.0 0.2 9.1 3.2 8.1 ]

	fmt.Println(list.PopFront()) // (1.0, nil)
	fmt.Println(list.PopBack()) // (8.1, nil)

	list.Clear()

	fmt.Println(list.Empty()) // true
}