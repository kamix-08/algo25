const $  = (sel, ctx = document.body) => ctx.querySelector(sel)
const $$ = (sel, ctx = document.body) => [...ctx.querySelectorAll(sel)]

addEventListener('DOMContentLoaded', () => {
    if (!document.URL.endsWith('/register'))
        return
    
    const input = $('input[name=country]')
    const list = $('#list')

    input.addEventListener('input', (e) => {
        if (!e.target.value) {
            input.classList.add('error')
            l_country.innerText = 'this field cannot be empty'
            return
        }

        input.classList.remove('error')
        l_country.innerText = ''

        fetch('/search/' + encodeURI(e.target.value))
            .then(data => data.json())
            .then(data => {
                list.innerHTML = ''

                for (let c of data) {
                    const btn = document.createElement('button')

                    btn.innerText = c
                    btn.onclick = (e) => {
                        e.preventDefault()
                        input.value = c
                    }

                    list.appendChild(btn)
                }
            })
    })

    const email = $('input[name=email]')
    const pass1 = $('input[name=pass1]')
    const pass2 = $('input[name=pass2]')

    const l_email   = $('#email-error')
    const l_pass    = $$('.error-pass')
    const l_country = $('#country-error')

    const validateEmail = async (e) => {
        email.classList.add('error')

        if (!email.value) {
            l_email.innerText = 'this field cannot be empty'
            return false
        }

        if (!email.value.includes('@') || 
            email.value.endsWith('@') ||
            !email.value.split('@')[1].includes('.') ||
            email.value.endsWith('.')) {
            l_email.innerText = 'this email address is invalid'
            return false
        }

        await fetch('/lookup/' + encodeURIComponent(email.value), {
            cache: 'no-store'
        })
            .then(data => {
                if (data.status == 409) {
                    l_email.innerText = 'this email address is already in use'
                    return false
                }
            })

        email.classList.remove('error')
        l_email.innerText = ''
        return true
    }

    const validatePass = (e) => {
        if (!pass1.value) {
            pass1.classList.add('error')
            l_pass[0].innerText = 'this field cannot be empty'
            return false
        }
        
        if (!pass2.value) {
            pass2.classList.add('error')
            l_pass[1].innerText = 'this field cannot be empty'
            return false
        }
        
        if (pass1.value != pass2.value) {
            pass1.classList.add('error')
            pass2.classList.add('error')

            l_pass.forEach(e => {
                e.innerText = 'the passwords don\'t match'
            })
            return false
        }

        pass1.classList.remove('error')
        pass2.classList.remove('error')
        l_pass.forEach(e => {
            e.innerText = ''
        })

        return true
    }

    const validateCountry = async () => {
        const country = input.value

        await fetch('/search/' + encodeURIComponent(country))
            .then(data => data.json())
            .then(data => {
                if (data.indexOf(country) == -1) {
                    input.classList.add('error')
                    l_country.innerText = 'this country doesn\'t exist'
                    return false
                }

                input.classList.remove('error')
                l_country.innerText = ''
                return true
            })
    }

    email.addEventListener('input', validateEmail)

    pass1.addEventListener('input', validatePass)
    pass2.addEventListener('input', validatePass)

    $('form').addEventListener('submit', async (e) => {
        e.preventDefault()

        if (!(await validateEmail()) || !validatePass() || !validateCountry()) {
            console.log('no')
            return
        }

        console.log('yes')
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                pass: pass1.value,
                country: input.value
            })
        })
    })
})