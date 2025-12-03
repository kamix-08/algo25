package main

import "fmt"

func toBinaryString(x int) string {
	res := ""

	for x != 0 {
		var bit string

		if (x&1) == 1 { 
			bit = "1"
		} else { 
			bit = "0" 
		}

		res = bit + res
		x >>= 1
	}

	return res
}

func fromBinaryString(x string) int {
	res := 0

	for _, c := range x {
		var bit int

		if string(c) == "1" {
			bit = 1
		} else {
			bit = 0
		}

		res <<= 1
		res += bit
	}

	return res
}

func main() {
	fmt.Println(toBinaryString(0b110))
	fmt.Println(toBinaryString(0b01001))
	fmt.Println(toBinaryString(0b10011101))

	fmt.Println(toBinaryString(0x7FFFFFFF))

	fmt.Println(fromBinaryString("100"))
	fmt.Println(fromBinaryString("11001"))
	fmt.Println(fromBinaryString("1100010"))
}