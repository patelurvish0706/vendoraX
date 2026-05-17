<?php
include "db.php";

header("Content-Type: application/json");

if (!isset($_COOKIE['customer_token'])) {
    echo json_encode([
        "status" => "invalid"
    ]);
    exit;
}

$cid = (int) base64_decode($_COOKIE['customer_token']);

$data = [];

/*
|--------------------------------------------------------------------------
| GET ALL ORDERS
|--------------------------------------------------------------------------
|
| If ordered_at == delivered_at
| Then it is considered OFFLINE PURCHASE
|
*/

$q = "
SELECT 
    o.id,
    o.product_id,
    o.qty,
    o.total,
    o.status,
    o.ordered_at,
    o.delivered_at,

    p.title,
    p.price,
    p.image,
    p.description,
    p.warranty,
    p.category,

    v.vendor_name,
    v.vendor_phone,
    v.address,
    v.shop_name,

    CASE
        WHEN o.ordered_at = o.delivered_at
        THEN 'offline'
        ELSE 'online'
    END AS order_type

FROM orders o

JOIN products p
ON o.product_id = p.id

JOIN vendors v
ON p.vendor_id = v.vendor_id

WHERE o.customer_id = $cid

ORDER BY o.id DESC
";

$res = $conn->query($q);

while ($row = $res->fetch_assoc()) {

    // extra safety
    if (
        $row['ordered_at'] === $row['delivered_at']
    ) {
        $row['order_type'] = "offline";
    } else {
        $row['order_type'] = "online";
    }

    $data[] = $row;
}

echo json_encode([
    "status" => "ok",
    "data" => $data
]);
?>