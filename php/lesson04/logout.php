<?php

require_once 'includes/utils.php';

unset($_SESSION['logged_in']);

redirect('login.php', null, false);