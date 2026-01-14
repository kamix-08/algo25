package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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

		for _, e := range edges {
			i, _ := strconv.Atoi(e)
			y = append(y, i - 1)
		}

		x = append(x, y)
	}

	var gl GraphList
	gl.x = x

	return gl
}

func (g GraphList) String() string {
	s := ""

	for i, n := range g.x {
		s += fmt.Sprintf("%v: %v\n", i, n)
	}

	return s
}

func BFS(graph *GraphList, start int, search int) bool {
	start -= 1
	search -= 1

	visited := make([]bool, len(graph.x))
	visited[start] = true

	var q []int
	q = append(q, start)

	for len(q) != 0 {
		v := q[0]
		q = q[1:]

		for _, e := range graph.x[v] {
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

func DFS(graph *GraphList, start int, search int, visited []bool) bool {
	if len(visited) != len(graph.x) {
		visited = make([]bool, len(graph.x))

		start -= 1
		search -= 1
	}

	visited[start] = true

	for _, n := range graph.x[start] {
		if visited[n] {
			continue
		}

		if n == search || DFS(graph, n, search, visited) {
			return true
		}
	}

	return false
}

func DFS_iter(graph *GraphList, start int, search int) bool {
	start -= 1
	search -= 1

	visited := make([]bool, len(graph.x))
	visited[start] = true

	var s []int
	s = append(s, start)

	for len(s) != 0 {
		foundFree := false

		for _, n := range graph.x[s[len(s) - 1]] {
			if visited[n] {
				continue
			}

			if n == search {
				return true
			}

			foundFree = true
			s = append(s, n)
			visited[n] = true
			break
		}

		if !foundFree {
			s = s[:len(s) - 1]
		}
	}

	return false
}