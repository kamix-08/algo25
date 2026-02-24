package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Graph struct {
	x [][]int
}

func ReadFromFile(path string) *Graph {
	g := &Graph{}

	file, _ := os.Open(path)
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		split := strings.Split(line, ": ")

		indexInt, _ := strconv.Atoi(split[0])
		indexInt -= 1

		for len(g.x) <= indexInt {
			g.x = append(g.x, make([]int, 0))
		}

		connections := strings.Split(split[1], ", ")

		for _, c := range connections {
			val, _ := strconv.Atoi(c)
			g.x[indexInt] = append(g.x[indexInt], val-1)
		}
	}

	return g
}

func (g *Graph) String() string {
	var res string

	for i, v := range g.x {
		res += fmt.Sprintf("%v: %v\n", i, v)
	}

	return res
}