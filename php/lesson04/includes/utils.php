<?php

session_start();

function generateLink($label, $href) {
    return "<li><a class='menu-link' href='$href'>$label</a></li>";
}

function redirect($target, $msg, $error = true) {
    if ($error) {
        $_SESSION['error-msg'] = $msg;
    } else {
        $_SESSION['success-msg'] = $msg;
    }

    header("Location: $target");
    exit();
}

function connectToDb() {
    return new mysqli('localhost', 'root', '', 'chat');
}

function displayMsg() {
    if (isset($_SESSION['error-msg'])) {
        echo '<i class=\'err\'>' . $_SESSION['error-msg'] . '</i>';
    }

    if (isset($_SESSION['success-msg'])) {
        echo '<i class=\'succ\'>' . $_SESSION['success-msg'] . '</i>';
    }
}