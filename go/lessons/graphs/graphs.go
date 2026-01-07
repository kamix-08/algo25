package main

import (
	"bufio"
	"os"
	"strings"
)

type GraphList struct {
	x [][]int
}

func AdjListFromFile(file string) GraphList {
	f, _ := os.Open(file)
	defer f.Close()

	var x [][]int

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		var y []int

		line := scanner.Text()
		edges := strings.Split(line, ",")

		for e := range edges {
			y = append(y, int(e))
		}

		x = append(x, y)
	}

	var gl GraphList
	gl.x = x

	return gl
}

func BFS(adjList GraphList, start int, search int) {
	
}