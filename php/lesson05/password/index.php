<title>password generator</title>

<form method="post" name="form">
    <input type="number" id="len"><br><br>

    <label>lowercase<input type="checkbox" id="lowercase"></label><br>
    <label>uppercase<input type="checkbox" id="uppercase"></label><br>
    <label>numbers<input type="checkbox" id="numbers"></label><br>
    <label>special<input type="checkbox" id="special"></label>
</form>

<textarea id="out" readonly cols="40" rows="12"></textarea>

<script>
    const f = e => {
        e.preventDefault()

        const fd = new FormData()
        fd.append('len', len.value)
        fd.append('lowercase', lowercase.checked)
        fd.append('uppercase', uppercase.checked)
        fd.append('numbers', numbers.checked)
        fd.append('special', special.checked)

        fetch('password.php', {
            method: 'POST',
            body: fd
        }).then(r => r.json()).then(r => out.innerHTML = r.res)
    }

    Array.from(document.querySelectorAll('input')).forEach(a => a.oninput = f)
</script>