<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$cid = base64_decode($_COOKIE['customer_token']);

$q = "
SELECT o.id, o.qty, o.total,
p.title, p.price, p.image, p.description, p.warranty, p.category, o.status,
c.name, c.mobile, c.address
FROM orders o
JOIN products p ON o.product_id = p.id
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.customer_id = $cid
ORDER BY o.id DESC;
";

$res = $conn->query($q);

$data = [];
while($row = $res->fetch_assoc()){
    $data[] = $row;
}

echo json_encode(["status"=>"ok","data"=>$data]);