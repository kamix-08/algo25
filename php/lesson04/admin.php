<title>admin panel</title>

<?php require_once 'includes/header.php' ?>

<?php
$db = connectToDb();
$usr = $db->query('SELECT id, role from users where login=\'' . $_SESSION['logged_in'] . '\'')->fetch_assoc();

if (empty($usr) || $usr['role'] != 'ROLE_ADMIN'): 
    redirect('login.php', null);
else:
    $users = $db->query('SELECT id, login, role from users')->fetch_all(MYSQLI_ASSOC);
?>
    <table>
        <?php foreach ($users as $user): ?>
            <tr>
                <td><?= $user['id'] ?></td>
                <td><?= $user['login'] ?></td>
                <td><form action="admin-role-post.php" method="post">
                    <input type="hidden" name="id" value="<?= $user['id'] ?>">
                    <select name="role">
                        <option value="user" <?php if ($user['role'] == 'ROLE_USER') { echo 'selected'; } ?>>user</option>
                        <option value="mod" <?php if ($user['role'] == 'ROLE_MOD') { echo 'selected'; } ?>>moderator</option>
                        <option value="admin" <?php if ($user['role'] == 'ROLE_ADMIN') { echo 'selected'; } ?>>administrator</option>
                    </select>
                    <input type="submit" value="update">
                </form></td>
                <td><form action="admin-delete-post.php" method="post">
                    <input type="hidden" name="id" value="<?= $user['id'] ?>">
                    <input type="submit" value="delete">
                </form></td>
            </tr>
        <?php endforeach; ?>
    </table>
<?php endif; ?>

<?php require_once 'includes/footer.php' ?>