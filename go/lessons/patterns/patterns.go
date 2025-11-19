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
	BoyerMoore
)

func FindFirst(pattern string, text string, method SearchPattern, debug bool) int {
	var idx int

	switch method {
	case Naive: idx = findNaive(pattern, text)
	case BoyerMoore: idx = findBoyerMoore(pattern, text)
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