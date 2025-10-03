let keys: [String : String] = [
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
    "0": " "
]

// case insensitive
// czyli krowa jest ok
// KROWA tez jest ok 

func encode(_ text: String) -> String {
    var res: String = ""

    for c in text.lowercased() {
        let cs = String(c)

        if res.count != 0 {
            res += " "
        }

        var found = false
        for (k, v) in keys {
            for i in 0..<v.count {
                if String(v[v.index(v.startIndex, offsetBy: i)]) == cs {
                    for _ in 0...i {
                        res += k
                    }

                    found = true
                    break
                }
            }
        }

        if !found {
            res += "!"
        }
    }

    return res
}

// space insensitive
// czyli 55 777 666 9 2 jest ok
// 5577766692 tez jest ok

func decode(_ text: String) -> String {
    var res: String = ""
    let ntext = text + " "

    var last: String = " "
    var count: Int = 0

    for c in ntext {
        let cs = String(c)

        if cs != last {
            if last != " " {
                if let v = keys[last] {
                    res += String(v[v.index(v.startIndex, offsetBy: count-1)])
                } else {
                    res += "!"
                }
            }

            last = cs
            count = 1
        } else {
            count += 1
        }
    }

    return res
}

print("Zakodować, czy odkodować? (Z/O): ")
let input = readLine()!.lowercased()

print("Podaj ciąg: ")
let code = readLine()!

if input == "z" {
    print(encode(code))
} else {
    print(decode(code))
}