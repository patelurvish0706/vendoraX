<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo json_encode(["status"=>"invalid"]); 
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

// get issues only for vendor products
$q = "
SELECT 
    i.id,
    i.issue,
    i.description,
    i.created_at,
    i.status,

    o.qty,

    p.title, p.category, p.price, p.image, p.warranty, p.description AS pdesc,

    c.name, c.mobile, c.address

FROM issues i
JOIN orders o ON i.order_id = o.id
JOIN products p ON o.product_id = p.id
JOIN customers c ON o.customer_id = c.customer_id

WHERE p.vendor_id = ?
ORDER BY i.id DESC
";

$stmt = $conn->prepare($q);
$stmt->bind_param("i", $vendor_id);
$stmt->execute();

$res = $stmt->get_result();

$data = [];

while($row = $res->fetch_assoc()){
    $data[] = $row;
}

echo json_encode(["status"=>"ok","data"=>$data]);
?>