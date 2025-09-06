package main

import (
	"fmt"
	"math"
	"sort"
)

// -- counting sort --

func countInt(arr []int, digit int) {
	_min := math.MaxInt
	_max := math.MinInt

	if digit == -1 {
		for _, v := range arr {
			if v > _max {
				_max = v
			}

			if v < _min {
				_min = v
			}
		}
	} else {
		_min = 0
	}

	var counts []int
	if digit == -1 {
		counts = make([]int, _max - _min + 1)
	} else {
		counts = make([]int, 10)
	}
	
	tmp := make([]int, len(arr))
	copy(tmp, arr)

	for _, v := range tmp {
		counts[getDigit(v, digit) - _min]++
	}

	sum := 0
	for i := range counts {
		sum += counts[i]
		counts[i] = sum
	}

	for i := len(tmp) - 1; i >= 0; i-- {
		ele := tmp[i]
		dig := getDigit(ele, digit)

		arr[counts[dig - _min] - 1] = ele
		counts[dig - _min]--
	}
}

// -- radix sort --

func getDigit(v int, d int) int {
	if d == -1 {
		return v
	}

	for i := 0; i < d && v > 0; i++ {
		v /= 10
	}

	return v % 10
}

func radixInt(arr []int) {
	_max := math.MinInt

	for _, v := range arr {
		if v > _max {
			_max = v
		}
	}

	n := 0
	for _max > 0 {
		_max /= 10
		n++
	}

	for i := range n {
		countInt(arr, i)
	}
}

// -- bucket sort --

func bucketInt(arr []int) {
	n := len(arr)
	buckets := make([][]int, n)

	_min := math.MaxInt
	_max := math.MinInt

	for _, v := range arr {
		if v < _min {
			_min = v
		}

		if v > _max {
			_max = v
		}
	}

	for _, v := range arr {
		idx := n * ((v - _min) / (_max - _min + 1))
		buckets[idx] = append(buckets[idx], v)
	}

	k := 0
	for i := range n {
		// insertion sort might be better, 
		// beacause of small bucket sizes, 
		// but i'm too lazy to copy it over 
		// from the other file :P

		if len(buckets[i]) != 0 {
			sort.Ints(buckets[i])

			copy(arr[k:], buckets[i])
			k += len(buckets[i])
		}
	}
}

func main() {
	arr := []int{170, 45, 75, 90, 802, 24, 2, 66}

	bucketInt(arr)
	fmt.Println(arr)
}