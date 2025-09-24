package main

import (
	"fmt"
	"slices"
)

type PriorityQueue struct {
	elements []int
}

func (pq PriorityQueue) Size() int {
	return len(pq.elements)
}

func (pq PriorityQueue) IsEmpty() bool {
	return pq.Size() == 0
}

func (pq *PriorityQueue) Enqueue(vals ...int) {
	for _, v := range vals {
		i := 0
		for i < pq.Size() && pq.elements[i] > v {
			i += 1
		}

		if i == pq.Size() {
			pq.elements = append(pq.elements, v)
		} else {
			pq.elements = slices.Insert(pq.elements, i, v)
		}
	}
}

func (pq *PriorityQueue) Dequeue() (int, error) {
	if pq.IsEmpty() {
		return 0, fmt.Errorf("empty queue")
	}

	ele := pq.elements[0]
	pq.elements = pq.elements[1:]

	return ele, nil
}

func (pq PriorityQueue) String() string {
	res := "[ "
	for _, v := range pq.elements {
		res += fmt.Sprint(v) + " "
	}
	return res + "]"
}