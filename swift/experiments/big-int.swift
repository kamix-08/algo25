enum BigIntError: Error {
    case invalidValue
}

class BigInt: CustomStringConvertible {
    var val: String

    init(val: String) throws {
        var notZero = -1

        for (i, c) in val.enumerated() {
            if !c.isNumber {
                throw BigIntError.invalidValue
            }

            if notZero == -1 && c != "0" {
                notZero = i
            }
        }

        if notZero == -1 {
            self.val = "0"
        } else {
            self.val = String(val[val.index(val.startIndex, offsetBy:notZero)...])
        }
    }

    var description: String {
        return self.val
    }

    func getElement(idx: Int) -> Int {
        return Int(String(self.val[self.val.index(self.val.startIndex, offsetBy: idx)]))!
    }

    func setElement(idx: Int, val: Int) {
        let i = self.val.index(self.val.startIndex, offsetBy: idx)
        self.val.replaceSubrange(i...i, with: String(val))
    }

    static func ==(lhs: BigInt, rhs: BigInt) -> Bool {
        return lhs.val == rhs.val
    }

    static func !=(lhs: BigInt, rhs: BigInt) -> Bool {
        return !(lhs == rhs)
    }

    static func >(lhs: BigInt, rhs: BigInt) -> Bool {
        if lhs == rhs {
            return false
        }

        let la = lhs.val.count
        let lb = rhs.val.count
        
        if la != lb {
            return la > lb
        }

        for i in 0..<la {
            let a = lhs.getElement(idx: i)
            let b = rhs.getElement(idx: i)

            if a != b {
                return a > b
            }
        }

        return false
    }

    static func >=(lhs: BigInt, rhs: BigInt) -> Bool {
        return lhs == rhs || lhs > rhs
    }

    static func <(lhs: BigInt, rhs: BigInt) -> Bool {
        return !(lhs >= rhs)
    }

    static func <=(lhs: BigInt, rhs: BigInt) -> Bool {
        return lhs == rhs || lhs < rhs
    }

    static func +(lhs: BigInt, rhs: BigInt) -> BigInt {
        var carry = 0

        let la = lhs.val.count
        let lb = rhs.val.count

        var res = ""

        for i in 1...[la, lb].max()! {
            let ea, eb: Int

            if i > la {
                ea = 0
            } else {
                ea = lhs.getElement(idx: la - i)
            }

            if i > lb {
                eb = 0
            } else {
                eb = rhs.getElement(idx: lb - i)
            }

            let sum = ea + eb + carry
            carry = sum / 10
            res = String(sum % 10) + res
        }

        return try! BigInt(val: res)
    }

    static func +=(lhs: inout BigInt, rhs: BigInt) {
        lhs.val = (lhs + rhs).val
    }

    static func -(lhs: BigInt, rhs: BigInt) -> BigInt {
        if rhs > lhs {
            return lhs - rhs
        }

        var borrow = false

        let la = lhs.val.count
        let lb = rhs.val.count

        var res = ""

        for i in 1...[la, lb].max()! {
            let ea, eb: Int

            if i > la {
                ea = 0
            } else {
                ea = lhs.getElement(idx: la - i)
            }

            if i > lb {
                eb = 0
            } else {
                eb = rhs.getElement(idx: lb - i)
            }

            var diff = ea - eb - (borrow ? 1 : 0)
            borrow = false

            if diff < 0 {
                diff += 10
                borrow = true
            }

            res = String(diff % 10) + res
        }

        return try! BigInt(val: res)
    }

    static func -=(lhs: inout BigInt, rhs: BigInt) {
        lhs.val = (lhs - rhs).val
    }
}

var a = try BigInt(val: "00123")
var b = try BigInt(val: "77")
var c = try BigInt(val: "1000")

print("a =", a)          // Should print: a = 123
print("b =", b)          // Should print: b = 77
print("c =", c)          // Should print: c = 1000

let sum = a + b
print("a + b =", sum)    // Should print: a + b = 200

let diff = c - a
print("c - a =", diff)   // Should print: c - a = 877

a += b
print("a += b ->", a)    // Should print: a += b -> 200

c -= b
print("c -= b ->", c)    // Should print: c -= b -> 923

print("a == b:", a == b) // Should print: a == b: false
print("a > b:", a > b)   // Should print: a > b: true
print("a < c:", a < c)   // Should print: a < c: true