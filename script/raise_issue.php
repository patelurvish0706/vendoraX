<?php
include "db.php";

if (!isset($_POST['order_id']) || !isset($_POST['issue'])) {
    echo "Missing data"; exit;
}

$order_id = intval($_POST['order_id']);
$issue = trim($_POST['issue']);
$desc = trim($_POST['description'] ?? "");

// safe insert
$stmt = $conn->prepare("
INSERT INTO issues (order_id, issue, description)
VALUES (?, ?, ?)
");

$stmt->bind_param("iss", $order_id, $issue, $desc);

if ($stmt->execute()) {
    echo "Issue submitted";
} else {
    echo "Error";
}
?>