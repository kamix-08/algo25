package main

import (
	"fmt"
	"os"
	"time"
)

func ReadFile(file string) string {
	data, _ := os.ReadFile(file)
	return string(data)
}

func Profile(callback func()) time.Duration {
	start := time.Now()

	callback()

	elapsed := time.Since(start)
	println("Time elapsed: ", elapsed.Milliseconds(), "ms")
	
	return elapsed
}

func Verify(callback func(string, string) int, pattern string, text string) (bool, int) {
	idx := callback(pattern, text)
	passed := text[idx:idx+len(pattern)] == pattern

	if passed {
		fmt.Println("Passed")
	} else {
		fmt.Println("Failed")
	}

	return passed, idx
}

type SearchPattern int

const (
	Naive SearchPattern = iota
)

func findNaive(pattern string, text string) int {
	for i := 0; i <= len(text) - len(pattern); i++ {
		found := true

		for j := 0; j < len(pattern); j++ {
			if text[i+j] != pattern[j] {
				found = false
				break
			}
		}

		if found {
			return i
		}
	}

	return -1
}

func FindFirst(pattern string, text string, method SearchPattern, debug bool) int {
	var idx int

	switch method {
	case Naive: idx = findNaive(pattern, text)
	}

	if debug {
		if idx != -1 {
			fmt.Println("Found at", idx)
		} else {
			fmt.Println("Didn't find")
		}
	}

	return idx
}