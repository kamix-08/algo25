#pragma once

#include <string>

#include "stack.hpp"

template<typename T>
Stack<T> reverse(Stack<T> stack) {
    Stack<T> reversed;

    while (!stack.isEmpty())
        reversed.push(stack.pop());

    return reversed;
}

bool checkValid(std::string file);