let popup

document.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.includes('cookies_allowed='))
        return

    popup = document.createElement('div')
    popup.classList.add('popup')

    popup.innerHTML = "\
    <div>\
        <img src='/cookie.png' alt='cookie' width='250'></img>\
        <h2>We <i>NEED</i> cookies</h2>\
        <p>Accept cookies or something bad will happen...</p>\
        <div>\
            <button class='reject' onclick='handleCookie(false)'>Reject...</button>\
            <button class='accept' onclick='handleCookie(true)'>Accept</button>\
        </div>\
    </div>"

    document.body.appendChild(popup)
})

function handleCookie(accept) {
    document.cookie = `cookies_allowed=${accept}`
    popup.remove()
}