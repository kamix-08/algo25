<?php

$lowercase = 'abcdefghijklmnopqrstuvwxyz';
$uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
$numbers = '0123456789';
$special = '!@#$%^&*()_+-=~`|\\:;\"\'<>,.?/';

$charset = '';

$fields = ['lowercase', 'uppercase', 'numbers', 'special'];

foreach ($fields as $field) {
    if ($_POST[$field] == 'true') {
        $charset .= $$field;
    }
}

$res = '';

for ($i=0; $i<$_POST['len']; $i++) {
    $res .= $charset[rand(0, strlen($charset)-1)];
}

header('Content-Type: application/json');
echo json_encode(['res' => $res]);
exit();