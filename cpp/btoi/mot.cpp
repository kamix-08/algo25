#include <iostream>
#include <queue>
#include <vector>

using namespace std;

vector<vector<char>> map;
int n, m;

void bfs(int x, int y) {
    queue<pair<int, int>> q;
    q.push({x, y});
    map[x][y] = '0';

    int dx[] = {0,  0, 1, -1};
    int dy[] = {1, -1, 0,  0};

    while (!q.empty()) {
        auto [cx, cy] = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int nx = (cy + dx[i] + n) % n;
            int ny = (cx + dy[i] + m) % m;

            if (map[ny][nx] == '1') {
                q.push({ny, nx});
                map[ny][nx] = '0';
            }
        }
    }
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    cin >> n >> m;
    int total = 0;
    
    map.resize(m, vector<char>(n));
    for (int i=0; i<m; i++)
        for (int j=0; j<n; j++)
            cin >> map[i][j];

    for (int i=0; i<m; i++)
        for (int j=0; j<n; j++)
            if (map[i][j] == '1') {
                bfs(i, j);
                total++;
            }

    cout << total;
    
    return 0;
}