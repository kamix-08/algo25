package main

import (
	"fmt"
	"strings"
)

func main() {
	inputs := "ala ma kota a kot ma ale"
	hashmap := NewHashMap(4)

	for _, word := range strings.Split(inputs, " ") {
		v, _ := hashmap.Get(word)
		hashmap.Set(word, v + 1)
	}
	
	fmt.Println(hashmap)
}