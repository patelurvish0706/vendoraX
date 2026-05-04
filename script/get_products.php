<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo json_encode([]);
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$stmt = $conn->prepare("SELECT * FROM products WHERE vendor_id=?");
$stmt->bind_param("i", $vendor_id);
$stmt->execute();

$res = $stmt->get_result();

$products = [];

while ($row = $res->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>