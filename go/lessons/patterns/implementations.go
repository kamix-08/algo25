package main

func findNaive(pattern string, text string) int {
	for i := 0; i <= len(text)-len(pattern); i++ {
		found := true

		for j := 0; j < len(pattern); j++ {
			if text[i+j] != pattern[j] {
				found = false
				break
			}
		}

		if found {
			return i
		}
	}

	return -1
}

func findBoyerMoore(pattern string, text string) int {
	offsets := make(map[byte]int)
	n := len(pattern)

	for i, l := range pattern {
		offsets[byte(l)] = n - i - 1
	}
	offsets[pattern[n-1]] = 1

	i := 0
	for i <= len(text)-n {
		found := true

		for j := n - 1; j >= 0; j-- {
			if text[i+j] != pattern[j] {
				found = false
				o, f := offsets[text[i+j]]

				if f {
					i += o
				} else {
					i += n
				}

				break
			}
		}

		if found {
			return i
		}
	}

	return -1
}