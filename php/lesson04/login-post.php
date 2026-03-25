<?php

require_once 'includes/utils.php';

unset($_SESSION['error-msg']);
unset($_SESSION['success-msg']);

if (empty($_POST['login'])) {
    redirect('login.php', 'musisz podać login');
}

if (empty($_POST['pass'])) {
    redirect('login.php', 'musisz podać hasło');
}

$login = $_POST['login'];

$db = connectToDb();

$res = $db->query('SELECT password from users where login=\'' . $login . '\'');

$pass = $res->fetch_assoc()['password'];

if (!password_verify($_POST['pass'], $pass)) {
    redirect('login.php', 'nieprawidłowe dane');
}

$_SESSION['logged_in'] = $login;
redirect('chat.php', 'zalogowano pomyślnie', false);