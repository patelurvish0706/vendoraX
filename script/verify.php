<?php
include "db.php";

header("Content-Type: application/json");

if (!isset($_COOKIE['vendor_token'])) {
    echo json_encode([
        "status" => "invalid"
    ]);
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$stmt = $conn->prepare("
SELECT vendor_id 
FROM vendors 
WHERE vendor_id=?
");

$stmt->bind_param("i", $vendor_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {

    echo json_encode([
        "status" => "valid",
        "vendor_id" => $vendor_id
    ]);

} else {

    echo json_encode([
        "status" => "invalid"
    ]);
}
?>