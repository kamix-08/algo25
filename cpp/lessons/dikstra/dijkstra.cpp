#include "dijkstra.hpp"

#include <queue>
#include <fstream>

std::vector<node> dikstra(matrix graph, uint start, uint end) {
    std::vector<node> prev;
    prev.resize(graph.size());

    prev[start].weight = 0;

    bool allVisited = false;
    int minIdx = -1;

    while (!allVisited) {
        allVisited = true;

        // iterate list to find smallest W
        for (uint i{}; i < graph.size(); i++) {
            if (prev[i].visited)
                continue;

            allVisited = false;

            if (minIdx == -1 || (prev[i].weight != -1 && prev[i].weight < prev[minIdx].weight))
                minIdx = i;
        }

        if (minIdx == end || minIdx == -1 || prev[minIdx].weight == -1)
            return prev;

        // iterate neigh
        for (uint i{}; i < graph.size(); i++) {
            if (prev[i].visited || graph[minIdx][i] == -1)
                continue;

            uint curCost = prev[minIdx].weight + graph[minIdx][i];
            if (prev[i].weight != -1 && prev[i].weight <= curCost)
                continue;

            prev[i].weight = curCost;
            prev[i].prev = minIdx;
        }

        prev[minIdx].visited = true;
        minIdx = -1;
    }

    return prev;
}

matrix loadGraph(std::string file) {
    matrix graph;

    std::ifstream f(file);
    std::string line;

    int n = -1;

    while (std::getline(f, line)) {
        std::vector<int> row;

        if (n != -1) 
            row.reserve(n);

        uint firstChar = 0;
        bool isLastNumber = false;

        for (uint i{}; i < line.size(); i++) {
            switch (line[i])
            {
            case '.':
                isLastNumber = false;
                row.push_back(-1);
                break;
            case ',':
                if (isLastNumber)
                    row.push_back(std::stoi(line.substr(firstChar, i-firstChar)));

                isLastNumber = false;
                firstChar = i+1;
                break;
            case ' ':
                break;
            
            default:
                isLastNumber = true;
                break;
            }
        }

        if (n == -1) {
            n = row.size();
            graph.reserve(n);
        }

        graph.push_back(row);
    }

    return graph;
}