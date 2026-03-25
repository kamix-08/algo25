<title>login</title>

<?php require_once 'includes/header.php' ?>

<h1>zaloguj się</h1>

<form method="post" action="login-post.php">
    <label>login<input type="text" name="login"></label>
    <label>hasło<input type="password" name="pass"></label>

    <input type="submit" value="wyślij">
</form>

<?php displayMsg() ?>

<?php require_once 'includes/footer.php' ?>