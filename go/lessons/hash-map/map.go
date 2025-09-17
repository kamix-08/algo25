package main

import "fmt"

type HashMap struct {
	elements []*Node
	size     uint64
}

type Node struct {
	key string
	val int
	nxt *Node
}

func fnv(v string) uint64 {
	var hash uint64 = 0xcbf29ce484222325
	const prime uint64 = 0x100000001b3

	bytes := []byte(v)

	for _, b := range bytes {
		hash *= prime
		hash ^= uint64(b)
	}

	return hash
}

func (hmap HashMap) Insert(k string, v int) bool {
	e, n := hmap.Find(k)
	if e {
		return false
	}

	*n = &Node{k, v, nil}
	return true
}

func (hmap HashMap) Set(k string, v int) bool {
	e, n := hmap.Find(k)
	if !e {
		return hmap.Insert(k, v)
	}

	(*n).val = v
	return  true
}

func (hmap HashMap) Find(v string) (bool, **Node) {
	bucket := fnv(v) % hmap.size

	n := &hmap.elements[bucket]
	if *n == nil {
		return false, n
	}

	tmp := *n
	for tmp != nil {
		if tmp.key == v {
			return true, &tmp
		}

		if tmp.nxt == nil {
			tmp.nxt = &Node{v, 0, nil}
			return false, &tmp.nxt
		}

		tmp = tmp.nxt
	}

	return false, &tmp
}

func (hmap HashMap) Get(v string) (int, bool) {
	e, n := hmap.Find(v)
	if !e {
		return 0, false
	}

	return (*n).val, true
}

func (hmap HashMap) Remove(v string) bool {
	e, n := hmap.Find(v)
	if !e {
		return false
	}

	n = &(*n).nxt
	return true
}

func (hmap HashMap) String() string {
	res := "{ "

	for _, n := range hmap.elements {
		for n != nil {
			res += fmt.Sprintf("( %v: %v ) ", n.key, n.val)
			n = n.nxt
		}
	}

	return res + "}"
}

func NewHashMap(size uint64) *HashMap {
	new := HashMap{}

	new.size = size
	new.elements = make([]*Node, size)

	return &new
}