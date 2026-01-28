#pragma once

#include <vector>
#include <string>

#define uint unsigned int
#define matrix std::vector<std::vector<int>>

struct node {
    int weight = -1;
    int prev = -1;
    bool visited = false;
};

std::vector<node> dikstra(matrix graph, uint src, uint dest);

matrix loadGraph(std::string file);