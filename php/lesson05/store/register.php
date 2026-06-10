<?php 

require_once('header.php'); 

if (isset($_POST['email'])) {
    require_once('db.php');

    if (count($db->query('SELECT id from users where email=\'' . $_POST['email'] . '\'')->fetch_all()) == 0) {
        $db->query('INSERT into users (`email`, `password`) values (\'' . $_POST['email'] . '\', \'' . password_hash($_POST['password'], PASSWORD_DEFAULT) . '\')');
        $_SESSION['logged_in'] = $db->query('SELECT id from users where email=\'' . $_POST['email'] . '\'')->fetch_assoc()['id'];
        header('Location: .');
        exit();
    }
}

?>

<h1>register</h1>

<form method="post">
    <label>email <input type="email" name="email"></label>
    <label>password <input type="password" name="password"></label>

    <button type="submit">register</button>
</form>

<a href="login.php">login</a>