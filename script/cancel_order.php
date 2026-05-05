<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    echo "Unauthorized"; exit;
}

$cid = base64_decode($_COOKIE['customer_token']);
$order_id = $_POST['order_id'];

// get order
$q = "SELECT product_id, qty FROM orders WHERE id=? AND customer_id=?";
$stmt = $conn->prepare($q);
$stmt->bind_param("ii", $order_id, $cid);
$stmt->execute();
$res = $stmt->get_result();

if (!$res->num_rows) {
    echo "Order not found"; exit;
}

$row = $res->fetch_assoc();

// restore stock
$conn->query("UPDATE products SET stock = stock + {$row['qty']} WHERE id = {$row['product_id']}");

// delete order
$conn->query("DELETE FROM orders WHERE id=$order_id");

echo "Order Cancelled";