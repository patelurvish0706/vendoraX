<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$id = base64_decode($_COOKIE['customer_token']);

$stmt = $conn->prepare("SELECT * FROM customers WHERE customer_id=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    echo json_encode(["status"=>"valid","data"=>$row]);
} else {
    echo json_encode(["status"=>"invalid"]);
}
?>