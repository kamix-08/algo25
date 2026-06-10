<?php

require_once('logged_only.php');
require_once('header.php');
require_once('db.php');

function cart($data, $items) { ?>
    <div>
        <h3><?= $data['cart_id'] ?></h3>

        <?php foreach($items as $item): ?>
            <div>
                <h5><?= $item['name'] ?></h5>
                <p>
                    <i><?= $item['quantity'] ?></i> x
                    <i>$<?= $item['price'] ?></i> =
                    <b>$<?= $item['quantity'] * $item['price'] ?></b>
                </p>
            </div>
        <?php endforeach; ?>
    </div>
<?php } ?>

<h1>cart</h1>

<?php 
$q1 = 'SELECT * from carts where user_id=\'' . $_SESSION['logged_in'] . '\' and order_id is null';

foreach($db->query($q1)->fetch_all(MYSQLI_ASSOC) as $cart):
    $q2 = 'SELECT * from items inner join products on products.id=product_id where cart_id=\'' . $cart['cart_id'] . '\'';
    cart($cart, $db->query($q2)->fetch_all(MYSQLI_ASSOC));
endforeach; ?>