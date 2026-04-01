<?php

require_once 'includes/utils.php';

$db = connectToDb();
$usr = $db->query('SELECT id, role from users where login=\'' . $_SESSION['logged_in'] . '\'')->fetch_assoc();

if (empty($usr)):
    redirect('login.php', null);
    exit();
endif;

$msg = $db->query('SELECT user_id from messages where id=' . $_POST['msg_id'])->fetch_assoc();

if (isset($msg) && ($usr['role'] == 'ROLE_MOD' || $usr['role'] == 'ROLE_ADMIN' || $msg['user_id'] == $usr['id'])):
    $db->query('DELETE from messages where id=' . $_POST['msg_id']);
endif;

redirect('chat.php', null, false);