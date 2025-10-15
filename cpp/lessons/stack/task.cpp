#include <fstream>

#include "task.hpp"

bool checkValid(std::string file) {
    std::ifstream f(file);

    Stack<char> par;
    std::string valid = "(){}[]";

    char cur;
    while (f.get(cur)) {
        bool symbol = false;
♦♦
        size_t idx = valid.find(cur);

        if (idx == std::string::npos) 
            continue;
        
        if (idx % 2 == 0) {
            par.push(cur);
            continue;
        }

        if (valid[idx - 1] != par.peek()) 
            return false;

        par.pop();
    }

    return true;
}