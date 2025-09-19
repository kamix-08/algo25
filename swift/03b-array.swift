// -- ZAD 1 --
func returnOnlyInt(arr: [Any]) -> [Int] {
    var new: [Int] = []

    arr.forEach { v in
        if let vi = v as? Int {
            new.append(vi)
        }
    }

    return new;
}

var arr: [Any] = [1,2,"c","d",0,-1,"abc"]
print(returnOnlyInt(arr: arr))

// -- ZAD 2 --
func rotateArray(arr: [Any], rot: String) -> [Any] {
    let dir: Bool = rot[rot.startIndex].lowercased() == "l"
    var n: Int = Int(rot[rot.index(after: rot.startIndex)..<rot.endIndex])!

    var new: [Any] = arr
    while n > 0 {
        print(new)

        var tmp: ArraySlice<Any>

        if dir {
            tmp = new[new.index(after: new.startIndex)..<new.endIndex]
            tmp.append(new[new.startIndex])
        } else {
            tmp = new[new.startIndex..<new.index(before: new.endIndex)]
            tmp.insert(new[new.index(before: new.endIndex)], at: 0)
        }

        new = Array(tmp)
        n -= 1
    }

    return new
}

print("\nR2")
print(rotateArray(arr: arr, rot: "R2"))

print("\nL3")
print(rotateArray(arr: arr, rot: "L3"))

// -- ZAD 3 --
func multiplyMatrices(a: [[Double]], b: [[Double]]) -> [[Double]] {
    let m = a.count
    let n = b.count

    for row in a {
        if row.count != n {
            print("Invalid matrix size for multiplication")
            return []
        }
    }

    let p = b[b.startIndex].count
    for row in b {
        if row.count != p {
            print("Invalid matrix size")
            return []
        }
    }

    var res: [[Double]] = Array(repeatElement(Array(repeatElement(0.0, count: p)), count: m))

    for y in 0..<m {
        for x in 0..<p {
            for i in 0..<n {
                res[y][x] += a[y][i] * b[i][x]
            }
        }
    }

    return res
}

let A: [[Double]] = [
    [1, 2, 1],
    [0, 1, 0],
    [2, 3, 4]
]

let B: [[Double]] = [
    [2, 5],
    [6, 7],
    [1, 8]
]

print("")
print(multiplyMatrices(a: A, b: B))