const form = document.querySelector('form')
const items = document.getElementById('items')

function getFormProp(name) {
    return document.querySelector(`input[name='${name}']`).value
}

form.onsubmit = (e) => {
    e.preventDefault()

    const name  = getFormProp('name')
    const count = getFormProp('count')
    const price = getFormProp('price')

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name, count, price
        })
    })
        .then(() => {
            refresh()
        })
}

function getKeys() {
    return document.cookie.split(';').map(e => e.split('=')[0]?.trim())
}

function getValues(k) {
    return document.cookie.split(';').map(e => e.split('=')).find(e => e[0]?.trim() == k)[1]?.trim()
}

function clearCart() {
    for (const k of getKeys())
        document.cookie = `${k}=`
}

async function refresh() {
    let innerHtml = ''

    for (const k of getKeys()) {
        const n = +getValues(k)
        if (!n) continue

        const resp = await fetch(`/item/${k}`)
        const item = await resp.json()

        if (!item[0]) continue

        innerHtml += `<p>${item[0].name} | ${n} | ${item[0].price} | ${item[0].price * n}</p>`
    }

    items.innerHTML = innerHtml
}

refresh()