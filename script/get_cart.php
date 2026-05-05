<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$cid = base64_decode($_COOKIE['customer_token']);

$q = "
SELECT c.id as cart_id, c.qty, 
p.id, p.title, p.price, p.image, p.stock, p.warranty, p.description, p.category,
v.shop_name, v.vendor_phone
FROM cart c
JOIN products p ON c.product_id = p.id
JOIN vendors v ON p.vendor_id = v.vendor_id
WHERE c.customer_id = $cid
";

$res = $conn->query($q);

$data = [];
while($row = $res->fetch_assoc()){
    $data[] = $row;
}

echo json_encode(["status"=>"ok","data"=>$data]);