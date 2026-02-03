const cbs = [...document.getElementsByClassName('player-cb')]
const err = document.getElementById('error')

err.innerText = ''

document.getElementById('form').onsubmit = e => {
    if (cbs.reduce((a,b) => a + b.checked, 0) >= 2) 
        return

    err.innerText = 'you must select at least two players to start a tournament!'
    e.preventDefault()
}