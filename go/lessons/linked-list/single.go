package main

import "fmt"

type LinkedListSingle[T comparable] struct {
	head *NodeSingle[T]
	size int
}

type NodeSingle[T comparable] struct {
	value T
	next  *NodeSingle[T]
}

func (list LinkedListSingle[T]) String() string {
	res := "[ "

	for node := list.head; node != nil; node = node.next {
		res += fmt.Sprint(node.value) + " "
	}

	return res + "]"
}

func (list LinkedListSingle[T]) Size() int {
	return list.size
}

func (list LinkedListSingle[T]) Empty() bool {
	return list.head == nil
}

func (list *LinkedListSingle[T]) InsertFront(value T) {
	node := NodeSingle[T]{value: value, next: list.head}
	list.head = &node

	list.size++
}

func (list *LinkedListSingle[T]) InsertBack(value T) {
	node := NodeSingle[T]{value: value, next: nil}

	list.size++

	if list.Empty() {
		list.head = &node
		return
	}

	n := list.head
	for n.next != nil {
		n = n.next
	}

	n.next = &node
}

func (list *LinkedListSingle[T]) InsertIndex(index int, value T) error {
	if list.Size() < index {
		return fmt.Errorf("invalid index. tried %v, when size is %v", index, list.Size())
	}
	
	list.size++

	if index == 0 {
		list.head = &NodeSingle[T]{value: value, next: list.head}
		return nil
	}

	n := list.head
	for i := 1; i < index; i++ {
		n = n.next
	}

	tmp := n.next
	n.next = &NodeSingle[T]{value: value, next: tmp}
	return nil
}

func (list LinkedListSingle[T]) At(index int) (T, error) {
	if list.Size() <= index {
		var zero T
		return zero, fmt.Errorf("invalid index. tried %v, when sizez is %v", index, list.Size())
	}

	n := list.head
	for i := 0; i < index; i++ {
		n = n.next
	}

	return n.value, nil
}

func (list *LinkedListSingle[T]) DeleteAt(index int) error {
	if list.Size() <= index {
		return fmt.Errorf("invalid index. tried %v, when size is %v", index, list.Size())
	}

	list.size--

	if index == 0 {
		list.head = list.head.next
		return nil
	}

	n := list.head
	for i := 1; i < index; i++ {
		n = n.next
	}

	if n.next != nil {
		n.next = n.next.next
	} else {
		n.next = nil
	}

	return nil
}

func (list *LinkedListSingle[T]) DeleteValue(value T) bool {
	if list.Empty() {
		return false
	}

	if list.head.value == value {
		list.head = list.head.next
		list.size--
		return true
	}

	for node := list.head; node.next != nil; node = node.next {
		if node.next.value != value {
			continue
		}

		list.size--
		node.next = node.next.next
		return true
	}

	return false
}

func (list *LinkedListSingle[T]) DeleteAll(value T) int {
	if list.Empty() {
		return 0
	}

	count := 0

	for node := list.head; node.next != nil; {
		if node.next.value != value {
			node = node.next
			continue
		}

		count++
		node.next = node.next.next
	}

	if list.head.value == value {
		list.head = list.head.next
		count++
	}

	list.size -= count
	return count
}

func (list *LinkedListSingle[T]) PopFront() (T, error) {
	if list.Empty() {
		var zero T
		return zero, fmt.Errorf("list empty")
	}

	value := list.head.value
	list.head = list.head.next
	list.size--
	return value, nil
}

func (list *LinkedListSingle[T]) PopBack() (T, error) {
	if list.Empty() {
		var zero T
		return zero, fmt.Errorf("list empty")
	}

	list.size--

	if list.head.next == nil {
		value := list.head.value
		list.head = nil
		return value, nil
	}

	node := list.head
	for node.next.next != nil {
		node = node.next
	}

	value := node.next.value
	node.next = nil
	return value, nil
}

func (list *LinkedListSingle[T]) Clear() bool {
	if list.Empty() {
		return false
	}

	list.size = 0
	list.head = nil
	return true
}

func newLinkedListSingle[T comparable](values ...T) *LinkedListSingle[T] {
	list := LinkedListSingle[T]{}

	for _, v := range values {
		list.InsertBack(v)
	}

	return &list
}