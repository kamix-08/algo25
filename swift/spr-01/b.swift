func encode(_ text: String) -> String {
    var square = 1
    while square*square < text.count {
        square += 1
    }

    var grid: [[String]] = []

    for i in 0..<square*square {
        if i % square == 0 {
            grid.append([])
        }

        let key: String
        if i < text.count {
            key = String(text[text.index(text.startIndex, offsetBy: i)])
        } else {
            key = "_"
        }

        grid[i / square].append(key)
    }

    var dir = 0
    var idx = [-1, 0]
    var last = square
    var go = square

    var res: String = ""

    while true {
        if go == 0 {
            dir = (dir + 1) % 4
            if dir % 2 == 1 {
                last -= 1
            }

            go = last
            if go == 0 {
                break
            }
        }

        go -= 1

        switch dir {
            case 0:
                idx[0] += 1
                break
            case 1:
                idx[1] += 1
                break
            case 2:
                idx[0] -= 1
                break
            case 3: 
                idx[1] -= 1
                break
            default:
                break
        }

        res += grid[idx[1]][idx[0]]
    }

    return res
}

print("Podaj ciąg: ")
print(encode(readLine()!))