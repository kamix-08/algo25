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

func BFS(graph *GraphList, start int, search int) bool {
	visited := make([]bool, len(graph.x))
	visited[start] = true

	var q []int
	q = append(q, start)

	for len(q) != 0 {
		v := q[0]
		q = q[1:]

		for e := range graph.x[v] {
			if visited[e] {
				continue
			}

			if e == search {
				return true
			}

			visited[e] = true
			q = append(q, e)
		}
	}

	return false
}