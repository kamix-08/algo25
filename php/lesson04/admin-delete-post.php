<?php

require_once 'includes/utils.php';

$db = connectToDb();
$usr = $db->query('SELECT id, role from users where login=\'' . $_SESSION['logged_in'] . '\'')->fetch_assoc();

if (empty($usr) || $usr['role'] != 'ROLE_ADMIN'):
    redirect('login.php', null);
    exit();
endif;

$db->query('DELETE from users where id=' . $_POST['id']);
redirect('admin.php', null, false);