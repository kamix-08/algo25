package main

import (
	"errors"
)

type Heap[T any] struct {
	x []T
	n int
	less func(a T, b T) bool
}

func (h *Heap[T]) swap(i int, j int) {
	tmp := h.x[i]
	h.x[i] = h.x[j]
	h.x[j] = tmp
}

func (h *Heap[T]) GetMin() (T, error) {
	if h.n == 0 {
		var tmp T
		return tmp, errors.New("heap empty")
	}

	return h.x[0], nil
}

func (h *Heap[T]) Push(x T) {
	if h.n < len(h.x) {
		h.x[h.n] = x
	} else {
		h.x = append(h.x, x)
	}

	h.n++
	h.up(h.n-1)
}

func (h *Heap[T]) Pop() (T, error) {
	if h.n == 0 {
		var tmp T
		return tmp, errors.New("cannot pop from empty heap")
	}

	h.n--
	h.swap(0, h.n)

	h.down(0)

	return h.x[h.n], nil
}

func (h *Heap[T]) down(i int) {
	m := i
	l := 2*i+1
	r := 2*i+2

	if l < h.n && h.less(h.x[l], h.x[m]) {
		m = l
	}

	if r < h.n && h.less(h.x[r], h.x[m]) {
		m = r
	}

	if m != i {
		h.swap(i, m)
		h.down(m)
	}
}

func (h *Heap[T]) up(i int) {
	if i == 0 {
		return
	}

	j := (i-1)/2
	if h.less(h.x[j], h.x[i]) {
		return
	}

	h.swap(i, j)
	h.up(j)
}