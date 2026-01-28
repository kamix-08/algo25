const cb_all = document.getElementById('players-all')
const all_cbs = document.getElementsByClassName('player-cb')

cb_all.oninput = e => {
    if (e.target.checked)
        for (let cb of all_cbs)
            cb.checked = true
}

for (let cb of all_cbs) {
    cb.oninput = e => {
        if (!e.target.checked)
            cb_all.checked = false
    }
}