package main

import (
	"fmt"
	"slices"
)

type MinPriorityQueue struct {
	vals []int
}

// mozna zrobic bin-searcha, ale nie mam czasu na to lol
func (q *MinPriorityQueue) Enqueue(x int) {
	for i, v := range q.vals {
		if v >= x {
			q.vals = slices.Insert(q.vals, i, x)
			return
		}
	}

	q.vals = append(q.vals, x)
}

func (q MinPriorityQueue) IsEmpty() bool {
	return len(q.vals) == 0
}

func (q *MinPriorityQueue) Dequeue() (int, error) {
	if len(q.vals) == 0 {
		return 0, fmt.Errorf("empty list")
	}

	tmp := q.vals[0]
	q.vals = q.vals[1:]
	return tmp, nil
}

func (q MinPriorityQueue) String() string {
	return fmt.Sprint(q.vals)
}
