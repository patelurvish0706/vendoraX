<?php
include "db.php";

header("Content-Type: application/json");

if(!isset($_GET['vendor_id'])){
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$vendor_id = intval($_GET['vendor_id']);

$v = $conn->query("
SELECT vendor_id, vendor_name , shop_name, shop_desc , address, vendor_phone , shop_open_close
FROM vendors
WHERE vendor_id = $vendor_id
");

if(!$v->num_rows){
    echo json_encode(["status"=>"not_found"]);
    exit;
}

$vendor = $v->fetch_assoc();

$p = $conn->query("
SELECT *
FROM products
WHERE vendor_id = $vendor_id
ORDER BY id DESC
");

$products = [];

while($r = $p->fetch_assoc()){
    $products[] = $r;
}

echo json_encode([
    "status"=>"ok",
    "vendor"=>$vendor,
    "products"=>$products
]);
?>