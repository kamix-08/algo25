package main

import (
	"fmt"
)

// -- bubble sort --

func bubbleInt(arr []int) {
	for i := range arr {
		swap := false

		for j := 0; j < len(arr) - i - 1; j++ {
			if arr[j + 1] >= arr[j] {
				continue
			}

			arr[j], arr[j + 1] = arr[j + 1], arr[j]
			swap = true
		}

		if !swap {
			break
		}
	}
}

// -- selection sort --

func selectInt(arr []int) {
	for i := 0; i < len(arr) - 1; i++ {
		idx := i

		for j := i + 1; j < len(arr); j++ {
			if arr[j] < arr[idx] {
				idx = j
			}
		}

		if idx != i {
			arr[i], arr[idx] = arr[idx], arr[i]
		}
	}
}

// -- insertion sort --

func insertInt(arr []int) {
	for i := 1; i < len(arr); i++ {
		key := arr[i]

		j := i
		for j > 0 && arr[j - 1] > key {
			arr[j] = arr[j - 1]
			j--
		}

		if j != i {
			arr[j] = key
		}
	}
}

func main() {
	arr := []int{4, 2, 5, 3, 8, 6, 7, 1, 9}

	insertInt(arr)
	fmt.Println(arr)
}