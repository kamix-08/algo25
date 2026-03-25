<?php

require_once 'utils.php';

$menu = array(
    'Zaloguj' => 'login.php',
    'Rejestracja' => 'register.php',
    'Wyloguj' => 'logout.php'
);

?>

<link rel="stylesheet" href="style.css">

<nav>
    <ul>
        <?php foreach($menu as $label => $href) {
            echo generateLink($label, $href);
        } ?>
    </ul>
</nav>