<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo "Unauthorized"; exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);
$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM products WHERE id=? AND vendor_id=?");
$stmt->bind_param("ii", $id, $vendor_id);

echo $stmt->execute() ? "success" : "error";
?>