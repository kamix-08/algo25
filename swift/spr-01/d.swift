func encode(_ text: String, _ key: Int) -> String {
    var blocks: [String] = []
    var res: String = ""

    for i in 0..<text.count {
        let l = String(text[text.index(text.startIndex, offsetBy: i)])

        if i % key == 0 {
            blocks.append(l)
        } else {
            blocks[i / key] += l
        }
    }

    for block in blocks {
        for i in 0..<block.count {
            res += String(block[block.index(block.endIndex, offsetBy: -(i+1))])
        }
    }

    return res
}

func decode(_ text: String, _ key: Int) -> String {
    return encode(text, key)
}

print("Zakodować, czy odkodować? (Z/O): ")
let input = readLine()!.lowercased()

print("Podaj ciąg: ")
let code = readLine()!

print("Podaj klucz: ")
let key = Int(readLine()!)!

if input == "z" {
    print(encode(code, key))
} else {
    print(decode(code, key))
}