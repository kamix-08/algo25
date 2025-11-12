const btn = document.querySelector('#btn')

function arrToUl(arr) {
    const ul = document.createElement('ul')

    for (let ele of arr) {
        const li = document.createElement('li')
        li.innerHTML = ele
        ul.appendChild(li)
    }

    return ul
}

if (btn) {
    btn.onclick = async (e) => {
        const url = '/ajax'

        fetch(url)
            .then(res => res.json())
            .then(obj => {
                const ul = arrToUl(obj)
                document.querySelector('#res').appendChild(ul)
            })
            .catch(err => {
                console.error(err)
            })
    }
}