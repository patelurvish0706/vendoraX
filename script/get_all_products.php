<?php
include "db.php";

$sql = "SELECT p.*, v.shop_name 
        FROM products p 
        JOIN vendors v ON p.vendor_id = v.vendor_id";

$res = $conn->query($sql);

$products = [];

while ($row = $res->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>