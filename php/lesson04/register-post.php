<?php

require_once 'includes/utils.php';

unset($_SESSION['error-msg']);
unset($_SESSION['success-msg']);

if (empty($_POST['login'])) {
    redirect('register.php', 'musisz podać login');
}

if (empty($_POST['pass1'])) {
    redirect('register.php', 'musisz podać hasło');
}

if (empty($_POST['pass2'])) {
    redirect('register.php', 'musisz podać oba hasła');
}

if ($_POST['pass1'] != $_POST['pass2']) {
    redirect('register.php', 'hasła muszą być takie same');
}

$db = connectToDb();

$login = $_POST['login'];
$pass = password_hash($_POST['pass1'], PASSWORD_DEFAULT);

if ($db->query('SELECT login from users where login=\'' . $login . '\'')->num_rows != 0) {
    redirect('register.php', 'użytkownik o tej nazwie już istnieje');
}

if (!$db->query('INSERT into users (`login`, `password`) values (\'' . $login . '\',\'' . $pass . '\')')) {
    redirect('register.php', 'wystąpił błąd serwera');
}

redirect('login.php', 'zarejstrowano pomyślnie', false);