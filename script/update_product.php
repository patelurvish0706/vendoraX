<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo "Unauthorized"; exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$id = $_POST['id'];
$title = trim($_POST['title']);
$desc = trim($_POST['description']);
$price = $_POST['price'];
$stock = $_POST['stock'];
$warranty = $_POST['warranty'];
$category = $_POST['category'];

if (!$id || !$title || !$price) {
    echo "Required fields missing"; exit;
}

$stmt = $conn->prepare("UPDATE products SET 
title=?, description=?, price=?, stock=?, warranty=?, category=? 
WHERE id=? AND vendor_id=?");

$stmt->bind_param("ssdiisii", 
    $title, $desc, $price, $stock, $warranty, $category, $id, $vendor_id
);

echo $stmt->execute() ? "Updated" : "error";
?> 