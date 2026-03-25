<?php

require_once 'includes/utils.php';

$db = connectToDb();

$usr_id = $db->query('SELECT id from users where login=\'' . $_SESSION['logged_in'] . '\'')->fetch_assoc()['id'];
$db->query('INSERT into messages (`user_id`, `message`) values (' . $usr_id . ',\'' . $_POST['msg'] . '\')');

redirect('chat.php', null, false);