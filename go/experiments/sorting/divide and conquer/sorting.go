package main

import "fmt"

// -- merge sort --

func mergeInt(a []int, b []int) []int {
	i := 0
	j := 0

	c := make([]int, len(a)+len(b))

	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			c[i+j] = a[i]
			i++
		} else {
			c[i+j] = b[j]
			j++
		}
	}

	if i < len(a) {
		copy(c[i+j:], a[i:])
	} else {
		copy(c[i+j:], b[j:])
	}

	return c
}

func mergesortInt(arr []int) {
	if len(arr) <= 1 {
		return
	}

	mid := len(arr) / 2

	a := arr[:mid]
	b := arr[mid:]

	mergesortInt(a)
	mergesortInt(b)

	copy(arr, mergeInt(a, b))
}

// -- quick sort --

func quicksortInt(arr []int) {
	n := len(arr)

	if n <= 1 {
		return
	}

	pivot := arr[n - 1]
	i := 0
	
	for j := 0; j < n - 1; j++ {
		if arr[j] >= pivot {
			continue
		}

		arr[i], arr[j] = arr[j], arr[i]
		i++
	}

	arr[i], arr[n - 1] = arr[n - 1], arr[i]

	quicksortInt(arr[:i])
	quicksortInt(arr[i+1:])
}

// -- heap sort --

func max(ele ...int) int {
	m := ele[0]

	for _, v := range ele {
		if v > m {
			m = v
		}
	}

	return m
}

func heapfiy(arr []int, root int, end int) {
	l := root * 2 + 1
	r := l + 1

	if l >= end {
		l = root
	}

	if r >= end {
		r = root
	}

	if l == root && r == root {
		return
	}

	m := max(arr[root], arr[l], arr[r])

	if m == arr[root] {
		return
	}

	if m == arr[l] {
		arr[root], arr[l] = arr[l], arr[root]
		heapfiy(arr, l, end)
	} else {
		arr[root], arr[r] = arr[r], arr[root]
		heapfiy(arr, r, end)
	}
}

func heapsortInt(arr []int) {
	left := len(arr)

	for i := left / 2 - 1; i >= 0; i-- {
		heapfiy(arr, i, left)
	}

	for left > 1 {
		heapfiy(arr, 0, left)
		
		left--
		arr[0], arr[left] = arr[left], arr[0]
	}
}

func main() {
	arr := []int{8, 6, 7, 4, 5, 3, 2, 1}

	heapsortInt(arr)
	fmt.Println(arr)
}