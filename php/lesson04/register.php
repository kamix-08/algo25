<title>rejestracja</title>
<?php require_once 'includes/header.php' ?>

<h1>zarejestruj się</h1>

<form method="post" action="register-post.php">
    <label>login<input type="text" name="login"></label>
    <label>hasło<input type="password" name="pass1"></label>
    <label>powtórz hasło<input type="password" name="pass2"></label>

    <input type="submit" value="wyślij">
</form>

<?php require_once 'includes/footer.php' ?>