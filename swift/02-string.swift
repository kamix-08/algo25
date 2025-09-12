// -- zadanie 1 --

func z1() {
    print("Podaj imię:")
    let name = (readLine()!).lowercased()

    if (name == "kuba" || name == "barnaba" || name[name.index(before: name.endIndex)] != "a") {
        print("M")
    } else {
        print("K")
    }
}

// -- zadanie 2 --

func z2() {
    print("\nPodaj słowo do szyfru:")
    let word = readLine()!

    var ciphered = ""

    for i in stride(from: 0, to: word.count, by: 2) {
        ciphered.append(word[word.index(word.startIndex, offsetBy: i)])
    }
    for i in stride(from: 1, to: word.count, by: 2) {
        ciphered.append(word[word.index(word.startIndex, offsetBy: i)])
    }

    print(ciphered)
}

// -- zadanie 3 --

func z3() {
    print("\nPodaj PESEL:")
    let pesel = readLine()!

    if (!isPeselValid(pesel: pesel)) {
        print("Niepoprawny PESEL")
        return
    }

    if (Int(String(pesel[pesel.index(pesel.startIndex, offsetBy: 9)]))! % 2 == 0) {
        print("K")
    } else {
        print("M")
    }

    // tu jeszcze miał być odczyt daty
    // ale nie zdążyłem XD
}

func weight(s: String, i: Int, w: Int) -> Int {
    return Int(String(s[s.index(s.startIndex, offsetBy: i)]))! * w
}

func isPeselValid(pesel: String) -> Bool {
    if (pesel.count != 11) { return false }
    
    for char in pesel {
        if (!char.isNumber) { return false }
    }

    var sum = 0

    sum += weight(s: pesel, i: 0,  w: 1)
    sum += weight(s: pesel, i: 1,  w: 3)
    sum += weight(s: pesel, i: 2,  w: 7)
    sum += weight(s: pesel, i: 3,  w: 9)
    sum += weight(s: pesel, i: 4,  w: 1)
    sum += weight(s: pesel, i: 5,  w: 3)
    sum += weight(s: pesel, i: 6,  w: 7)
    sum += weight(s: pesel, i: 7,  w: 9)
    sum += weight(s: pesel, i: 8,  w: 1)
    sum += weight(s: pesel, i: 9,  w: 3)

    sum %= 10
    
    let control: Int
    if (sum == 0) {
        control = 0
    } else {
        control = 10 - sum
    }

    if(String(pesel[pesel.index(before: pesel.endIndex)]) != String(control)) { return false }

    return true
}

var input = ""
while true {
    print("\nWybierz zadanie:")
    input = readLine()!

    if (input == "k") {
        print("\nOpuszczanie programu...")
        break
    }

    switch input {
    case "1":
        z1()
    case "2":
        z2()
    case "3":
        z3()
    default:
        print("Niepoprawna opcja.\nDostępne opcje to: [1, 2, 3, k]")
    }
}