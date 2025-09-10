package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	set := Set[int]{}

	set.Insert(1)
	set.Insert(2)
	set.Insert(3)
	set.Insert(8)
	fmt.Println(set) // [1, 2, 3]

	set.Remove(2) 
	ok := set.Remove(0)
	fmt.Println(set)

	if !ok {
		fmt.Println("expected") // should print
	}

	set2 := Set[int]{}
	set2.Insert(3)
	set2.Insert(4)
	set2.Insert(5)
	set2.Insert(8)

	fmt.Println(Union(&set, &set2)) // [1, 3, 4, 5]
	fmt.Println(Intercestion(&set, &set2)) // [3]
	fmt.Println(Difference(&set, &set2)) // [1]
	fmt.Println(Difference(&set2, &set)) // [4, 5]

	set3 := Set[int]{}
	set3.Insert(1)
	set3.Insert(3)

	fmt.Println(IsSubsetOf(&set3, &set)) // true
	fmt.Println(IsSubsetOf(&set3, &set2)) // false

	// -- DODATKOWE --

	set_string := Set[string]{}

	f, err := os.Open("in.txt")
	if err != nil {
		fmt.Println("err", err)
	}
	
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()

		// fmt.Println("line", line)
		set_string.Insert(line)
	}

	var text []byte
	for _, t := range set_string.elements {
		t += "\n"
		text = append(text, t...)
	}

	// fmt.Println("text", text)
	os.WriteFile("out.txt", text[:len(text)-1], 0644)
}