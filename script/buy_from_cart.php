<?php
include "db.php";

$cid = base64_decode($_COOKIE['customer_token']);
$cart_id = $_POST['cart_id'];

// get cart item
$q = "
SELECT c.qty, p.id, p.price, p.stock
FROM cart c
JOIN products p ON c.product_id = p.id
WHERE c.id=$cart_id
";

$res = $conn->query($q);
$row = $res->fetch_assoc();

if (!$row) { echo "Not found"; exit; }

if ($row['qty'] > $row['stock']) {
    echo "Stock not available"; exit;
}

$total = $row['qty'] * $row['price'];

// insert order
$conn->query("INSERT INTO orders (customer_id, product_id, qty, total)
VALUES ($cid, {$row['id']}, {$row['qty']}, $total)");

// reduce stock
$conn->query("UPDATE products SET stock = stock - {$row['qty']} WHERE id={$row['id']}");

// remove from cart
$conn->query("DELETE FROM cart WHERE id=$cart_id");

echo "Order placed";