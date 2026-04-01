<?php

require_once 'includes/utils.php';

$db = connectToDb();
$usr = $db->query('SELECT id from users where login=\'' . $_SESSION['logged_in'] . '\'')->fetch_assoc();

if (isset($usr)):
    $usr_id = $usr['id'];
else:
    redirect('login.php', null);
    exit();
endif;

$db->query('INSERT into messages (`user_id`, `message`) values (' . $usr_id . ',\'' . $_POST['msg'] . '\')');

redirect('chat.php', null, false);