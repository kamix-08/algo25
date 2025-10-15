package main

import "fmt"

type Set struct {
	vals List
}

func (set Set) Size() int {
	return set.vals.Size()
}

func (set Set) Contains(x float64) bool {
	tmp := set.vals.head

	for tmp != nil {
		if tmp.val == x {
			return true
		}

		tmp = tmp.nxt
	}

	return false
}

func (set *Set) Insert(x float64) bool {
	if set.Contains(x) {
		return false
	}

	set.vals.InsertFront(x)
	return true
}

func (set *Set) Remove(x float64) bool {
	return set.vals.DeleteFirst(x)
}

func (set *Set) Clear() {
	set.vals.head = nil
	set.vals.size = 0
}

func (set Set) String() string {
	return fmt.Sprint(set.vals)
}

// ===

func intersection(s1, s2 *Set) Set {
	res := Set{}

	tmp := s1.vals.head

	for tmp != nil {
		if s2.Contains(tmp.val) {
			res.Insert(tmp.val)
		}

		tmp = tmp.nxt
	}

	return res
}
