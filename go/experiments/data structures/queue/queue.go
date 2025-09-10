package main

import "fmt"

type Queue[T any] struct {
	elements []T

	capacity int
	size	 int
	first 	 int
	last	 int
}

func NewQueue[T any](capacity int) *Queue[T] {
	q := Queue[T]{ capacity: capacity }
	q.elements = make([]T, capacity)

	return &q
}

func (queue *Queue[T]) Enqueue(element T) bool {
	if queue.Full() {
		return  false
	}

	queue.elements[queue.last] = element
	queue.last = (queue.last + 1) % queue.capacity
	queue.size++
	return true
}

func (queue *Queue[T]) Dequeue() (T, bool) {
	if queue.Empty() {
		var zero T
		return zero, false
	}

	first, _ := queue.Peek()
	queue.first = (queue.first + 1) % queue.capacity
	queue.size--
	return first, true
}

func (queue *Queue[T]) Peek() (T, bool) {
	if queue.Empty() {
		var zero T
		return zero, false
	}

	return queue.elements[queue.first], true
}

func (queue *Queue[T]) Empty() bool {
	return queue.size == 0
}

func (queue *Queue[T]) Full() bool {
	return queue.size == queue.capacity
}

func (queue *Queue[T]) String() string {
	if queue.Empty() {
		return "[]"
	}

	if queue.last > queue.first {
		return fmt.Sprint(queue.elements[queue.first:queue.last])
	}

	res := "["
	i := queue.first

	for i != queue.last {
		if i != queue.first {
			res += " "
		}

		res += fmt.Sprint(queue.elements[i])
		i = (i + 1) % queue.capacity
	}

	res += "]"
	return res
}

func main() {
	q := NewQueue[int](5)

	q.Enqueue(2)
	q.Enqueue(4)
	q.Enqueue(6)
	fmt.Println(q)

	q.Dequeue()
	q.Dequeue()
	fmt.Println(q)

	q.Enqueue(1)
	q.Enqueue(3)
	q.Enqueue(5)
	fmt.Println(q)
}