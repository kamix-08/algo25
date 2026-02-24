package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type GraphMatrix struct {
	x [][]int
}

type Node struct {
	x int
	cost int
	prev *Node
}

func ReadMatrixFromFile(path string) *GraphMatrix {
	g := &GraphMatrix{}

	file, _ := os.Open(path)
	defer file.Close()

	scanner := bufio.NewScanner(file)

	n := -1
	i := 0

	for scanner.Scan() {
		line := scanner.Text()
		row := strings.Split(line, " ")

		if n == -1 {
			n = len(row)
			g.x = make([][]int, n)
		}

		for _, c := range row {
			var val int

			if c == "." {
				val = 0
			} else {
				val, _ = strconv.Atoi(c)
			}

			g.x[i] = append(g.x[i], val)
		}

		i++
	}

	return g
}

func (n *Node) String() string {
	path := []int{n.x}

	cur := n
	for cur.prev != nil {
		cur = cur.prev
		path = append(path, cur.x)
	}

	slices.Reverse(path)

	return fmt.Sprintf("#%v: C(%v), %v", n.x, n.cost, path)
}

func NodeLess(a *Node, b *Node) bool {
	return a.cost < b.cost
}