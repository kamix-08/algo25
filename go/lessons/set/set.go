package main

import "fmt"

type Set[T comparable] struct {
	elements []T
}

func (set *Set[T]) Insert(element T) bool {
	if set.Contains(element) {
		return false
	}

	set.elements = append(set.elements, element)
	return true
}

func (set *Set[T]) Contains(element T) bool {
	for _, v := range set.elements {
		if v == element {
			return true
		}
	}

	return false
}

func (set *Set[T]) Remove(element T) bool {
	if !set.Contains(element) {
		return false
	}

	for i, v := range set.elements {
		if v != element {
			continue
		}

		set.elements[i], set.elements[len(set.elements)-1] = set.elements[len(set.elements)-1], set.elements[i]
		set.elements = set.elements[:len(set.elements)-1]
		return true
	}

	return false
}

func (set *Set[T]) Size() int {
	return len(set.elements)
}

func (set *Set[T]) Empty() bool {
	return set.Size() == 0
}

func (set *Set[T]) Clear() bool {
	if set.Empty() {
		return false
	}

	set.elements = make([]T, 0)
	return true
}

func Union[T comparable](A, B *Set[T]) Set[T] {
	new := Set[T]{}

	for _, v := range A.elements {
		new.Insert(v)
	}

	for _, v := range B.elements {
		new.Insert(v)
	}

	return new
}

func Intercestion[T comparable](A, B *Set[T]) Set[T] {
	new := Set[T]{}

	for _, v := range A.elements {
		if B.Contains(v) {
			new.Insert(v)
		}
	}

	return new
}

func Difference[T comparable](A, B *Set[T]) Set[T] {
	new := Set[T]{}

	for _, v := range A.elements {
		if !B.Contains(v) {
			new.Insert(v)
		}
	}

	return new
}

func IsSubsetOf[T comparable](A, B *Set[T]) bool {
	for _, v := range A.elements {
		if !B.Contains(v) {
			return false
		}
	}

	return true
}

func (set *Set[T]) String() string {
	return fmt.Sprint(set.elements)
}