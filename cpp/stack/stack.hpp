#pragma once

#include <vector>

template<typename T>
class Stack {
public:
    Stack() : elements() {};;

    size_t size() { return elements.size(); };
    bool isEmpty() { return size() == 0; };

    void push(T ele) { elements.push_back(ele); };

    T pop() { 
        T top = peek();
        elements.pop_back();
        return top;
    };

    T peek() { return elements[size() - 1]; };

private:
    std::vector<T> elements;
};