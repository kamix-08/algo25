#include <iostream>

#include "dijkstra.hpp"

int main() {
    uint i{};
    for (auto& x : dikstra(loadGraph("!test2.txt"),0,13)) {
        std::cout << ++i << ':' << x.prev+1 << '(' << x.weight << ")\n";
    }
    
    return 0;
}