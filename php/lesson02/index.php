<style>
    td {
        border: 1px solid black;
        padding: 5px;
    }
</style>

<a href="/web/lesson02">home</a>
<br><br>

<?php
$db = mysqli_connect('localhost', 'root', '', 'groceries');

if (!$db) {
    echo 'nie połączono';
    exit;
}

if (isset($_GET['delete'])) {
    mysqli_query($db, 'DELETE from products where id=' . $_GET['delete']);
}

if (isset($_POST['edit'])) {
    mysqli_query($db, 'UPDATE products set name=\'' . $_POST['name'] . '\', price_per_kg=' . $_POST['price_per_kg'] . ', stock_kg=' . $_POST['stock_kg'] . ' where id=' . $_POST['id']);
}

if (isset($_POST['add'])) {
    mysqli_query($db, 'INSERT into products values (null, \'' . $_POST['name'] . '\',' . $_POST['price_per_kg'] . ',' . $_POST['stock_kg'] . ')');
}

$res = mysqli_query($db, 'SELECT * from products');
?>

<table>
<?php
while ($prod = mysqli_fetch_assoc($res)): ?>
    <tr>
        <?php if (isset($_GET['edit']) && $_GET['edit'] == $prod['id']): ?>
            <form method="post">
                <input type="hidden" name="edit">
                <input type="hidden" name="id" value="<?= $prod['id'] ?>">
                <td><?= $prod['id'] ?></td>
                <td><input required type="text" name="name" value="<?= $prod['name'] ?>"></td>
                <td><input required step="0.01" type="number" name="price_per_kg" value="<?= $prod['price_per_kg'] ?>"></td>
                <td><input required step="0.01" type="number" name="stock_kg" value="<?= $prod['stock_kg'] ?>"></td>
                <td><input type="submit" value="zapisz"></td>
            </form>
        <?php else : ?>
            <td>
                <a href="?delete=<?= $prod['id'] ?>"> <?= $prod['id'] ?></a>
            </td>
            <td><?= $prod['name'] ?></td>
            <td><?= $prod['price_per_kg'] ?></td>
            <td><?= $prod['stock_kg'] ?></td>
            <td>
                <a href="?edit=<?= $prod['id'] ?>">edytuj</a>
            </td>
        <?php endif; ?>
    </tr>
<?php endwhile; ?> 
</table>

<form method="post">
    <h1>dodaj</h1>

    <input type="hidden" name="add">
    <input required type="text" name="name">
    <input required type="number" name="price_per_kg" step="0.01">
    <input required type="number" name="stock_kg" step="0.01">
    <input required type="submit" value="add">
</form>