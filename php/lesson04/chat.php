<title>chat</title>

<?php require_once 'includes/header.php' ?>

<?php if (empty($_SESSION['logged_in'])): 
    redirect('login.php', null);
else:
    $db = connectToDb();
    $messages = $db->query('SELECT * from messages inner join users on user_id=users.id order by time desc')->fetch_all(MYSQLI_ASSOC);

    echo '<table>';
        foreach ($messages as $msg): ?>
            <tr>
                <td><b><?= $msg['login'] ?></b> <i><?= $msg['time'] ?></i></td>
                <td><?= $msg['message'] ?></td>
            </tr>
        <?php endforeach;
    echo '</table>';
endif; ?>

<form method="post" action="chat-post.php">
    <textarea name="msg" cols="30" rows="10" style="display: block; margin-top: 20px;"></textarea>
    <input type="submit" value="wyślij">
</form>

<?php require_once 'includes/footer.php' ?>