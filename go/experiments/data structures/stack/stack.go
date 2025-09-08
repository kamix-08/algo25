package main

import "fmt"

type Stack[T any] struct {
	elements []T
}

func (stack *Stack[T]) Push(element ...T) {
	stack.elements = append(stack.elements, element...)
}

func (stack *Stack[T]) Pop() (T, bool) {
	if stack.Empty() {
		var zero T
		return zero, false
	}

	last, _ := stack.Peek()
	stack.elements = stack.elements[:len(stack.elements)-1]
	return last, true
}

func (stack *Stack[T]) Peek() (T, bool) {
	if stack.Empty() {
		var zero T
		return zero, false
	}

	return stack.elements[len(stack.elements) - 1], true
}

func (stack *Stack[T]) Size() int {
	return len(stack.elements)
}

func (stack *Stack[T]) Empty() bool {
	return stack.Size() == 0
}

func (stack Stack[T]) String() string {
	return fmt.Sprint(stack.elements)
}

func main() {
	stack := Stack[int]{}

	stack.Push(10, 11)
	stack.Push(12)
	stack.Push(8)

	stack.Pop()
	stack.Push(7)

	fmt.Println(stack)
}