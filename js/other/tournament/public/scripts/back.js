const hist = read()

hist.push(document.location.href)
save(hist)

function goBack() {
    let link = '/'

    if (hist.length > 1) {
        hist.pop()
        link = hist.pop()
    }

    save(hist)
    document.location.href = link
}

function read() {
    const data = sessionStorage.getItem('hist')
    return data ? JSON.parse(data) : []
}

function save(data) {
    sessionStorage.setItem('hist', JSON.stringify(data))
}