#include <iostream>

using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    unsigned long long n;
    cin >> n;
    
    if (n > 13 || n == 11 || n % 8 == 0 || n % 3 == 0) 
        cout << "TAK";
    else
        cout << "NIE";
    
    return 0;
}