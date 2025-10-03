// KOD BEZ KRESEK
// czyli 0676769268 jest ok
// 0-6767-6926-8 nie jest

func validate(_ code: String) -> Bool {
    if code.count != 10 {
        return false
    }

    var res: Int = 0

    for i in 0..<code.count-1 {
        let idx = code.index(code.startIndex, offsetBy: i)
        let val = Int(String(code[idx]))!

        res += val * (10 - i)
    }

    res %= 11
    res = 11 - res

    let cn: String

    switch res {
        case 11: cn = "0"
        case 10: cn = "X"
        default: cn = String(res)
    }

    return String(code[code.index(before: code.endIndex)]) == cn
}

print("Podaj kod: ")
let res = validate(readLine()!)

if res {
    print("Kod jest poprawny!")
} else {
    print("Kod jest niepoprawny.")
}