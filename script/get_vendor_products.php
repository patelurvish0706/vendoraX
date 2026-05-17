<?php

include "db.php";

header("Content-Type: application/json");

if(!isset($_COOKIE['vendor_token'])){
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$stmt = $conn->prepare("
SELECT *
FROM products
WHERE vendor_id=?
ORDER BY id DESC
");

$stmt->bind_param("i",$vendor_id);
$stmt->execute();

$res = $stmt->get_result();

$data = [];

while($r = $res->fetch_assoc()){
    $data[] = $r;
}

echo json_encode([
    "status"=>"ok",
    "data"=>$data
]);

?>