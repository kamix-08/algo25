func fib(_ n: Int) -> [Int] {
    if n == 1 {
        return [0]
    } else if n == 2 {
        return [1, 0]
    }

    var dyn_fib: [Int] = [0, 1]

    for i in 2..<n {
        dyn_fib.append(dyn_fib[i - 1] + dyn_fib[i - 2])
    }

    return dyn_fib.reversed()
}

print("Podaj ilość elementów: ")
print(fib(Int(readLine()!)!))