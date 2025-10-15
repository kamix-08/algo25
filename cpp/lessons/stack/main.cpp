#include <iostream>
#include <assert.h>

#include "stack.hpp"
#include "task.hpp"

using namespace std;

int main() {
    std::string toReverse = "abcdef";
    std::string file = "test.txt";

    Stack<char> reversingStack;

    for(char& c : toReverse)
        reversingStack.push(c);

    Stack<char> reversedStack = reverse(reversingStack);

    std::string reverse;
    reverse.reserve(toReverse.size());

    while (!reversedStack.isEmpty())
        reverse.insert(reverse.begin(), reversedStack.pop());

    std::cout << "Original: " << toReverse << " | Reversed: " << reverse << '\n';
    std::cout << "Is file valid: " << (checkValid(file) ? "true" : "false") << '\n';

    return 0;
}