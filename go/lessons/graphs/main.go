package main

import (
	"errors"
	"fmt"
)

func main() {
	fmt.Println("--- G1 ---")

	G1 := AdjListFromFile("./!test1.txt")
	fmt.Printf("%v\n", G1)

	if !BFS(&G1, 1, 9) { panic(errors.New("BFS #1 failed")) }
	if !BFS(&G1, 4, 5) { panic(errors.New("BFS #2 failed")) }
	if !BFS(&G1, 7, 3) { panic(errors.New("BFS #3 failed")) }
	fmt.Println("BFS tests passed!")
	
	if !DFS(&G1, 1, 9, make([]bool, 0)) { panic(errors.New("DFS #1 failed")) }
	if !DFS(&G1, 4, 5, make([]bool, 0)) { panic(errors.New("DFS #2 failed")) }
	if !DFS(&G1, 7, 3, make([]bool, 0)) { panic(errors.New("DFS #3 failed")) }
	fmt.Println("DFS tests passed!")
	
	if !DFS_iter(&G1, 1, 9) { panic(errors.New("DFS_iter #1 failed")) }
	if !DFS_iter(&G1, 4, 5) { panic(errors.New("DFS_iter #2 failed")) }
	if !DFS_iter(&G1, 7, 3) { panic(errors.New("DFS_iter #3 failed")) }
	fmt.Println("DF6_iter tests passed!")

	fmt.Println("\n--- G2 ---")
	
	G2 := AdjListFromFile("./!test2.txt")
	fmt.Printf("%v\n", G2)

	if !BFS(&G2, 1, 5) { panic(errors.New("BFS #1 failed")) }
	if  BFS(&G2, 1, 6) { panic(errors.New("BFS #2 failed")) }
	fmt.Println("BFS tests passed!")
	
	if !DFS(&G2, 1, 5, make([]bool, 0)) { panic(errors.New("DFS #1 failed")) }
	if  DFS(&G2, 1, 6, make([]bool, 0)) { panic(errors.New("DFS #2 failed")) }
	fmt.Println("DFS tests passed!")
	
	if !DFS_iter(&G2, 1, 5) { panic(errors.New("DFS_iter #1 failed")) }
	if  DFS_iter(&G2, 1, 6) { panic(errors.New("DFS_iter #2 failed")) }
	fmt.Println("DF6_iter tests passed!")

	fmt.Println("\nAll tests passed!")
}