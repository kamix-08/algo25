<?php

require_once('session.php');

if (empty($_SESSION['logged_in'])) {
    header('Location: login.php');
    exit();
}