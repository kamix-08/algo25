package main

import (
	"cmp"
	"errors"
)

type Heap[T cmp.Ordered] struct {
	data []T
	size int
}

func (h *Heap[T]) FindMin() (T, error) {
	if h.Size() == 0 {
		var tmp T
		return tmp, errors.New("heap empty")
	}

	return h.data[0], nil
}

func (h *Heap[T]) ExtractMin() (T, error) {
	if h.Size() == 0 {
		var tmp T
		return tmp, errors.New("heap empty")
	}

	h.size -= 1

	tmp := h.data[0]
	h.data[0] = h.data[h.Size()]
	h.data[h.Size()] = tmp

	return h.data[h.Size()+1], nil
}

func (h *Heap[T]) Insert(x T) {
	if h.Size() < len(h.data) {
		h.data[h.Size()] = x
	} else {
		h.data = append(h.data, x)
	}

	h.size += 1
	h.siftUp(h.Size())
}

func (h *Heap[T]) Size() int {
	return h.size
}

func (h *Heap[T]) siftDown(i int) {
	if i*2+1 >= h.Size() || (h.data[i] <= h.data[i*2+1] && h.data[i] <= h.data[i*2+2]) {
		return
	}

	m := i*2+1
	if h.data[i*2+2] < h.data[i*2+1] {
		m = i*2+2
	}

	tmp := h.data[i]
	h.data[i] = h.data[m]
	h.data[m] = tmp
}

func (h *Heap[T]) siftUp(i int) {
	if i == 0 || (h.data[i] >= h.data[i/2]) {
		return
	}

	tmp := h.data[i]
	h.data[i] = h.data[i/2]
	h.data[i/2] = tmp
}