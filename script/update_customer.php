<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    echo "Unauthorized";
    exit;
}

$id = base64_decode($_COOKIE['customer_token']);

$name = trim($_POST['title']);
$email = trim($_POST['email']);
$mobile = trim($_POST['mobile']);
$pincode = trim($_POST['pincode']);
$address = trim($_POST['addresss']);

if (!$name || !$email || !$mobile) {
    echo "All fields required";
    exit;
}

// remove old pincode if exists
$address = preg_replace('/ - \d{6}$/', '', $address);

// append new pincode
if ($pincode) {
    $address = $address . " - " . $pincode;
}

$lat = $_POST['lat'] ?? null;
$lng = $_POST['lng'] ?? null;

$stmt = $conn->prepare("UPDATE customers SET 
name=?, email=?, mobile=?, address=?, latitude=?, longitude=? 
WHERE customer_id=?");

$stmt->bind_param("ssssssi", 
    $name, $email, $mobile, $address, $lat, $lng, $id
);

echo $stmt->execute() ? "success" : "error";
?>