#include <iostream>
#include <set>

using namespace std;

int getColor(int a, int b) {
    int s0 = (a&0b100) >> 2;
    int s1 = (b&0b100) >> 2;

    int i0 = (a&0b010) >> 1;
    int i1 = (b&0b010) >> 1;

    int m0 = a&0b001;
    int m1 = b&0b001;

    return ((s0+s1)%2)<<2 | (i0*i1)<<1 | max(m0, m1);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    int n;
    cin >> n;

    set<int> colors;
    
    while(n --> 0) {
        int s, i, m;
        cin >> s >> i >> m;

        int c = (s << 2) | (i << 1) | m;
        
        if (!colors.insert(c).second)
            colors.insert(c | 0b1000);

        if (colors.size() >= 16)
            break;
    }

    set<int> newColors(colors);

    for (int i=0; i<colors.size(); i++) {
        for (int j=i+1; j<colors.size(); j++) {
            newColors.insert(getColor(*next(colors.begin(), i), *next(colors.begin(), j)));
        }
    }

    int count = 0;
    for (auto it = newColors.begin(); it != newColors.end(); it++) {
        if (!(*it & 0b1000))
            count++;
    }

    cout << count;
    
    return 0;
}