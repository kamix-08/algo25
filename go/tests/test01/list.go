package main

import "fmt"

type List struct {
	size int
	head *Node
}

type Node struct {
	val float64
	nxt *Node
}

func (lst List) Size() int {
	return lst.size
}

func (lst *List) InsertFront(x float64) {
	lst.size += 1
	lst.head = &Node{val: x, nxt: lst.head}
}

func (lst *List) InsertBack(x float64) {
	lst.size += 1

	if lst.Size() == 0 {
		lst.head = &Node{val: x}
		return
	}

	tmp := lst.head
	for tmp.nxt != nil {
		tmp = tmp.nxt
	}

	tmp.nxt = &Node{val: x}
}

func (lst *List) DeleteFirst(x float64) bool {
	if lst.Size() == 0 {
		return false
	}

	tmp := lst.head
	for tmp.nxt != nil {
		if tmp.nxt.val == x {
			tmp.nxt = tmp.nxt.nxt
			lst.size -= 1
			return true
		}

		tmp = tmp.nxt
	}

	return false
}

func (lst List) String() string {
	if lst.Size() == 0 {
		return "list(0): <empty>"
	}

	res := fmt.Sprintf("list(%v): ", lst.size)

	tmp := lst.head
	for tmp.nxt != nil {
		res += fmt.Sprintf("%v -> ", tmp.val)
		tmp = tmp.nxt
	}

	res += fmt.Sprint(tmp.val)

	return res
}
