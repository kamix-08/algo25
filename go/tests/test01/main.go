package main

import "fmt"

func main() {
	lst := List{}

	fmt.Println(lst) // list(0)

	lst.InsertFront(5)
	lst.InsertFront(3)
	lst.InsertFront(4)
	lst.InsertFront(8)

	fmt.Println(lst) // list(4): 8 -> 4 -> 3 -> 5

	lst.InsertBack(3)
	lst.InsertBack(1)
	lst.InsertBack(18)

	fmt.Println(lst) // list(7): 8 -> 4 -> 3 -> 5 -> 3 -> 1 -> 18

	lst.DeleteFirst(4)
	lst.DeleteFirst(18)
	lst.DeleteFirst(3)

	fmt.Println(lst) // list(4): 8 -> 5 -> 3 -> 1

	// ===

	set := Set{}

	set.Insert(2)
	set.Insert(3)
	set.Insert(4)
	set.Insert(5)

	set.Insert(2)

	fmt.Println(set) // 2 3 4 5

	fmt.Println(set.Remove(2))  // true
	fmt.Println(set.Remove(18)) // false
	fmt.Println(set)            // 3 4 5

	s2 := Set{}
	s2.Insert(3)
	s2.Insert(6)
	s2.Insert(7)
	s2.Insert(8)

	fmt.Println(intersection(&set, &s2)) // 3

	s2.Clear()
	fmt.Println(s2.Size()) // 0

	// ===

	q := MinPriorityQueue{}

	q.Enqueue(3)

	q.Dequeue()
	_, e := q.Dequeue()

	if e != nil {
		fmt.Println(e)
	}

	q.Enqueue(3)
	q.Enqueue(8)
	q.Enqueue(1)
	q.Enqueue(7)
	q.Enqueue(16)
	q.Enqueue(6)
	q.Enqueue(2)
	q.Enqueue(2)

	fmt.Println(q) // 1 2 2 3 6 7 8 16

	fmt.Println(q.Dequeue()) // 1
	fmt.Println(q.Dequeue()) // 2
	fmt.Println(q.Dequeue()) // 2
	fmt.Println(q)           // 3 6 7 8 16
}
