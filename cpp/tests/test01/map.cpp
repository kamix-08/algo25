#include <iostream>
#include <unordered_map>
#include <string>

void countLetters() {
    std::cout << "in: ";

    std::string in;
    std::cin >> in;

    std::unordered_map<char, unsigned int> chars;

    for (char& c : in) {
        if (chars.find(c) != chars.end())
            chars[c]++;
        else
            chars[c] = 1;
    }

    std::cout << '\n';

    for (auto it = chars.begin(); it != chars.end(); it++) {
        if (it != chars.begin())
            std::cout << ' ';
        std::cout << it->first << ": " << it->second;
    }
}

int main() {
    countLetters();
}