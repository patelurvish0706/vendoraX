<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo "invalid";
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$stmt = $conn->prepare("SELECT vendor_id FROM vendors WHERE vendor_id=?");
$stmt->bind_param("i", $vendor_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "valid";
} else {
    echo "invalid";
}
?>