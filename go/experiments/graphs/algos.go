package main

func (g *Graph) Bfs(start int, end int) bool {
	if start == end {
		return true
	}

	start -= 1
	end -= 1

	visited := make([]bool, len(g.x))
	visited[start] = true

	var q []int
	q = append(q, start)

	for len(q) != 0 {
		cur := q[0]
		q = q[1:]

		for _, n := range g.x[cur] {
			if visited[n] {
				continue
			}

			if n == end {
				return true
			}

			visited[n] = true
			q = append(q, n)
		}
	}

	return false
}

func (g *Graph) dfsRecursive(start int, end int, visited []bool) bool {
	for _, n := range g.x[start] {
		if visited[n] {
			continue
		}

		if n == end {
			return true
		}

		visited[n] = true
		if g.dfsRecursive(n, end, visited) {
			return true
		}
	}

	return false
}

func (g *Graph) DfsRecursive(start int, end int) bool {
	start -= 1
	end -= 1

	visited := make([]bool, len(g.x))
	visited[start] = true

	return g.dfsRecursive(start, end, visited)
}

func (g *Graph) Dfs(start int, end int) bool {
	if start == end {
		return true
	}

	start -= 1
	end -= 1

	visited := make([]bool, len(g.x))
	visited[start] = true

	var s []int
	s = append(s, start)

	for len(s) != 0 {
		cur := s[len(s)-1]
		s = s[:len(s)-1]

		for _, n := range g.x[cur] {
			if visited[n] {
				continue
			}

			if n == end {
				return true
			}

			visited[n] = true
			s = append(s, n)
		}
	}

	return false
}

func (m *GraphMatrix) Dijkstra(start int, end int) *Node {
	const inf = int(^uint(0)>>1)

	start -= 1
	end -= 1
	
	nodes := &Heap[*Node]{
		less: NodeLess,
	}

	nodes.Push(&Node{
		x: start,
		cost: 0,
		prev: nil,
	})

	visited := make([]bool, len(m.x))
	dists := make([]int, len(m.x))
	for i := range dists {
		dists[i] = inf
	}

	dists[start] = 0

	for {
		cur, err := nodes.Pop()

		if err != nil {
			return nil
		}

		if cur.x == end {
			return cur
		}

		if visited[cur.x] {
			continue
		}
		visited[cur.x] = true

		for n, w := range m.x[cur.x] {
			if w == 0 || visited[n] {
				continue
			}

			nc := cur.cost + w

			if nc < dists[n] {
				nodes.Push(&Node{
					x: n,
					cost: nc,
					prev: cur,
				})

				dists[n] = nc
			}
		}
	}
}