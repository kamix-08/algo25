const $ = (sel, ctx = document.body) => ctx.querySelector(sel)

const input_r = $('input[name="rating"]')
const input_n = $('input[name="name"]')
const input_s = $('input[name="surname"]')

function fillSuggest() {
    if (input_r.value) return

    if (input_n.value.length <= 2 && input_s.value.length <= 2) {
        input_r.placeholder = ''       
        return 
    }

    fetch(`/lookup-db?name=${input_n.value}&surname=${input_s.value}`)
        .then(data => data.json())
        .then(data => {
            input_r.placeholder = data[0] ? data[0].rating : 0
        })
}

input_n.oninput = fillSuggest
input_s.oninput = fillSuggest