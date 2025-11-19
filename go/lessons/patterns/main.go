package main

const NEEDLE = "!dupadupa"

func main() {
	println("\n100mb:")
	text := ReadFile("!test100mb.txt")
	println("naive:")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\nboyer-moore:")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, BoyerMoore, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, BoyerMoore, false) })
	}

	println("\n1gb:")
	text = ReadFile("!test1gb.txt")
	println("naive:")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\nboyer-moore:")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, BoyerMoore, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, BoyerMoore, false) })
	}
}