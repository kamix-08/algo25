package main

import "fmt"

func main() {
	pq := PriorityQueue{}

	pq.Enqueue(2, 3, 8, 6)
	fmt.Println(pq)

	fmt.Println(pq.Dequeue())
	fmt.Println(pq.Dequeue())

	pq.Enqueue(-1, 18, 3, 8, 7, 4)
	fmt.Println(pq)

	fmt.Println(pq.Dequeue())
	fmt.Println(pq.Dequeue())
}