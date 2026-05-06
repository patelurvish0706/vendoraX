<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo "Unauthorized"; exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$order_id = $_POST['order_id'];
$status = $_POST['status'];

// validate status
$allowed = ['pending','shipped','delivered'];
if (!in_array($status, $allowed)) {
    echo "Invalid status"; exit;
}

// check vendor owns product
$q = "
SELECT o.id 
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.id=? AND p.vendor_id=?
";

$stmt = $conn->prepare($q);
$stmt->bind_param("ii", $order_id, $vendor_id);
$stmt->execute();
$res = $stmt->get_result();

if (!$res->num_rows) {
    echo "Not allowed"; exit;
}

// update
$stmt = $conn->prepare("UPDATE orders SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $order_id);

echo $stmt->execute() ? "Updated" : "Error";
?>