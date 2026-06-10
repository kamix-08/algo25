<?php 

require_once('header.php'); 

if (isset($_POST['email'])) {
    require_once('db.php');

    $user = $db->query('SELECT id, password from users where email=\'' . $_POST['email'] . '\'')->fetch_assoc();
    if (password_verify($_POST['password'], $user['password'])) {
        $_SESSION['logged_in'] = $user['id'];
        Header('Location: .');
        exit();
    }
}

?>

<h1>login</h1>

<form method="post">
    <label>email <input type="email" name="email"></label>
    <label>password <input type="password" name="password"></label>

    <button type="submit">login</button>
</form>

<a href="register.php">register</a>