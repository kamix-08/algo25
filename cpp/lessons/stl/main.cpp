#include <iostream>
#include <fstream>
#include <algorithm>
#include <vector>
#include <string>
#include <map>
#include <functional>

enum modes {
    less,
    greater,
    first, 
    positions
};

std::vector<int> load() {
    std::ifstream file("./!input.txt");
    
    std::vector<int> nums;
    int tmp;
    
    while(file >> tmp)
        nums.push_back(tmp);
    
    // for (auto& x : nums)
    //     std::cout << x << ' ';
    
    std::cout << "wczytano " << nums.size() << " liczb.\n";

    file.close();

    return nums;
}

std::vector<int> findCondition(const std::vector<int>& nums, const std::function<bool(int)>& cond) {
    std::vector<int> idxs;

    auto it = nums.begin();
    while (it != nums.end()) {
        it = std::find_if(it, nums.end(), cond);
        if (it == nums.end()) break;
        idxs.push_back(it - nums.begin());
        it++;
    }

    return idxs;
}

void printVec(const std::vector<int>& vec) {
    if (vec.size() == 0) {
        std::cout << "nie znaleziono szukanych liczb...\n";
        return;
    }

    for (const int& x : vec)
        std::cout << x << ' ';
}

int main() {
    std::vector<int> nums = load();
    modes mode = first;

    std::string buf;
    int tmp;

    while (true) {
        std::cout << "\npodaj liczbę do wyszukania: ";
        std::cin >> buf;

        try {
            tmp = std::stoi(buf);
            
            switch (mode) {
                case first: {
                    auto it = std::find(nums.begin(), nums.end(), tmp);
                    if (it != nums.end()) std::cout << "liczba znaleziona na pozycji " << it - nums.begin() << '\n';
                    else std::cout << "nie znaleziono szukanej liczby...\n";
                    break;
                }
                
                case less: {
                    printVec(findCondition(nums, [tmp](int x){ return x < tmp; }));
                    break;
                }

                case greater: {
                    printVec(findCondition(nums, [tmp](int x){ return x > tmp; }));
                    break;
                }

                case positions: {
                    printVec(findCondition(nums, [tmp](int x){ return x == tmp; }));
                    break;
                }
            }
        } catch (std::invalid_argument) {
            if      (buf == "exit")      break;
            else if (buf == "less")      mode = less;
            else if (buf == "greater")   mode = greater;
            else if (buf == "first")     mode = first;
            else if (buf == "positions") mode = positions;
            else if (buf == "reload")    nums = load();
            else std::cout << "niepoprawna komenda...\n";
        }
    }

    return 0;
}