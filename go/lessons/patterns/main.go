package main

const NEEDLE = "dupa!"

func main() {
	println("10kb:")
	text := ReadFile("!test10kb.txt")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\n100kb:")
	text = ReadFile("!test100kb.txt")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\n1mb:")
	text = ReadFile("!test1mb.txt")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\n10mb:")
	text = ReadFile("!test10mb.txt")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\n100mb:")
	text = ReadFile("!test100mb.txt")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}

	println("\n1gb:")
	text = ReadFile("!test1gb.txt")
	if cor, _ := Verify(func(p string, t string) int { return FindFirst(p, t, Naive, true) }, NEEDLE, text); cor {
		Profile(func() { FindFirst(NEEDLE, text, Naive, false) })
	}
}