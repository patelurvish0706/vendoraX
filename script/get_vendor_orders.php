<?php
include "db.php";

header("Content-Type: application/json");

// ✅ check cookie
if (!isset($_COOKIE['vendor_token'])) {
    echo json_encode(["status"=>"invalid","msg"=>"No cookie"]);
    exit;
}

// ✅ decode safely
$vid = base64_decode($_COOKIE['vendor_token']);

if (!is_numeric($vid)) {
    echo json_encode(["status"=>"invalid","msg"=>"Invalid token"]);
    exit;
}

// ✅ prepare query (safe)
$q = "
SELECT o.id, o.qty, o.status,o.ordered_at, o.delivered_at,
p.id as 'product_id', p.title, p.description, p.price, p.stock, p.image, p.category, p.warranty,
c.name, c.mobile, c.address
FROM orders o
JOIN products p ON o.product_id = p.id
JOIN customers c ON o.customer_id = c.customer_id
WHERE p.vendor_id =?
ORDER BY o.id DESC
";

$stmt = $conn->prepare($q);

if (!$stmt) {
    echo json_encode(["status"=>"error","msg"=>$conn->error]);
    exit;
}

$stmt->bind_param("i", $vid);
$stmt->execute();

$res = $stmt->get_result();

$data = [];

while($r = $res->fetch_assoc()){
    $data[] = $r;
}

// ✅ response
echo json_encode([
    "status"=>"ok",
    "count"=>count($data),
    "data"=>$data
]);

?>