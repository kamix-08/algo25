<?php require_once('header.php'); ?>

<h1>home</h1>

<?php if (isset($_SESSION['logged_in'])): ?>
    <i>logged in as <?= $_SESSION['logged_in'] ?></i>
<?php endif; ?>