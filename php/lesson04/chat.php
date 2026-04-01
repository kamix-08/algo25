<title>chat</title>

<?php require_once 'includes/header.php' ?>

<?php
$db = connectToDb();
$usr = $db->query('SELECT id, role from users where login=\'' . $_SESSION['logged_in'] . '\'')->fetch_assoc();

if (empty($usr)): 
    redirect('login.php', null);
else:
    $messages = $db->query('SELECT * from users right join messages on user_id=users.id order by time desc')->fetch_all(MYSQLI_ASSOC);

    echo '<table>';
        foreach ($messages as $msg): ?>
            <tr>
                <td><b><?= isset($msg['login']) ? $msg['login'] : '[deleted]' ?></b></td>
                <td><i><?= $msg['time'] ?></i></td>
                <td><?= $msg['message'] ?></td>
                <td>
                    <?php if ($usr['role'] == 'ROLE_MOD' || $usr['role'] == 'ROLE_ADMIN' || $msg['user_id'] == $usr['id']): ?>
                        <form action="chat-delete-post.php" method="post">
                            <input type="hidden" name="msg_id" value="<?= $msg['id'] ?>">
                            <input type="submit" value="x">
                        </form>
                    <?php endif; ?>
                </td>
            </tr>
        <?php endforeach;
    echo '</table>';
endif; ?>

<form method="post" action="chat-post.php">
    <textarea name="msg" cols="30" rows="10" style="display: block; margin-top: 20px;"></textarea>
    <input type="submit" value="wyślij">
</form>

<?php require_once 'includes/footer.php' ?>