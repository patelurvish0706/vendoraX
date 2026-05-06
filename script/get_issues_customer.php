<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    echo json_encode(["status"=>"invalid"]); exit;
}

$cid = base64_decode($_COOKIE['customer_token']);

$q = "
SELECT 
    i.id, i.issue, i.description, i.status, i.created_at,
    p.title, p.category, p.price, p.image, p.warranty, p.description AS pdesc
FROM issues i
JOIN orders o ON i.order_id = o.id
JOIN products p ON o.product_id = p.id
WHERE o.customer_id = ?
ORDER BY i.id DESC
";

$stmt = $conn->prepare($q);
$stmt->bind_param("i", $cid);
$stmt->execute();

$res = $stmt->get_result();

$data = [];
while($row = $res->fetch_assoc()){
    $data[] = $row;
}

echo json_encode(["status"=>"ok","data"=>$data]);
?>