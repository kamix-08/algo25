package main

import "fmt"

type List[T comparable] struct {
	head *Node[T]
}

type Node[T comparable] struct {
	val	T
	next *Node[T]
}

func (lst *List[T]) Prepend(val T) {
	nxt := lst.head
	lst.head = &Node[T]{val: val, next: nxt}
}

func (lst *List[T]) Append(val T) {
	if lst.head == nil {
		lst.head = &Node[T]{val: val}
		return
	}

	node := lst.head
	for node.next != nil {
		node = node.next
	}

	node.next = &Node[T]{val: val}
}

func (lst *List[T]) Insert(idx int, val T) bool {
	if idx < 0 {
		return false
	}

	if lst.head == nil {
		if idx == 0 {
			lst.head = &Node[T]{val: val}
			return true
		}

		return false
	}

	node := &lst.head
	for range idx {
		if (*node).next == nil {
			return false
		}

		node = &(*node).next
	}

	new := &Node[T]{val: val, next: *node}
	*node = new
	return true
}

func (lst *List[T]) PopFront() (T, bool) {
	if lst.head == nil {
		var zero T
		return zero, false
	}

	val := lst.head.val
	lst.head = lst.head.next
	return val, true
}

func (lst *List[T]) PopBack() (T, bool) {
	if lst.head == nil {
		var zero T
		return zero, false
	}

	node := &lst.head
	for (*node).next != nil {
		node = &(*node).next
	}

	val := (*node).val
	*node = nil
	return val, true
}

func (lst *List[T]) Remove(val T) bool {
	if lst.head == nil {
		return false
	}

	node := &lst.head
	for *node != nil {
		if (*node).val == val {
			*node = (*node).next
			return true
		}
		
		node = &(*node).next
	}

	return false
}

func (lst *List[T]) Erase(idx int) bool {
	if idx < 0 {
		return false
	}

	node := &lst.head
	for range idx {
		if *node == nil {
			return false
		}

		node = &(*node).next
	}

	if *node == nil {
		return false
	}

	*node = (*node).next
	return true
}

func (lst *List[T]) Front() (T, bool) {
	if lst.head == nil {
		var zero T
		return zero, false
	}

	return lst.head.val, true
}

func (lst *List[T]) Back() (T, bool) {
	if lst.head == nil {
		var zero T
		return zero, false
	}

	node := lst.head
	for node.next != nil {
		node = node.next
	}

	return node.val, true
}

func (lst *List[T]) Get(idx int) (T, bool) {
	if idx < 0 || (idx == 0 && lst.head == nil) {
		var zero T
		return zero, false
	}

	node := lst.head
	for range idx {
		if node.next == nil {
			var zero T
			return zero, false
		}

		node = node.next
	}

	return node.val, true
}

func (lst *List[T]) Find(val T) *Node[T] {
	if lst.head == nil {
		return nil
	}

	node := lst.head
	for node != nil {
		if node.val == val {
			return node
		}

		node = node.next
	}

	return nil
}

func (lst *List[T]) String() string {
	if lst.head == nil {
		return "[]"
	}

	res := "["
	node := lst.head

	for node != nil {
		if len(res) > 1 {
			res += " "
		}

		res += fmt.Sprint(node.val)
		node = node.next
	}

	res += "]"
	return res
}

func (node *Node[T]) String() string {
	if node == nil {
		return "[]"
	}

	if node.next == nil {
		return fmt.Sprintf("[%v -> ()]", node.val)
	}

	return fmt.Sprintf("[%v -> (%v)]", node.val, node.next.val)
}

func main() {
	lst := &List[int]{}

    lst.Append(1)
    lst.Append(2)
    lst.Prepend(0)
    fmt.Println(lst)

    lst.Insert(1, 42)
    fmt.Println(lst)

    val, ok := lst.PopFront()
    fmt.Println(val, ok, lst)

    val, ok = lst.PopBack()
    fmt.Println(val, ok, lst)

    found := lst.Remove(42)
    fmt.Println(found, lst)

    lst.Append(99)
    val, ok = lst.Get(1)
    fmt.Println(val, ok)

    node := lst.Find(99)
    fmt.Println(node)

    lst.Erase(0)
    fmt.Println(lst)
}