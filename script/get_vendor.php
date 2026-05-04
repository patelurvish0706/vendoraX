<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$stmt = $conn->prepare("SELECT * FROM vendors WHERE vendor_id=?");
$stmt->bind_param("i", $vendor_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["status"=>"valid", "data"=>$row]);
} else {
    echo json_encode(["status"=>"invalid"]);
}
?>