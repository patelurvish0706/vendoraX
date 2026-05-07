<?php

include "db.php";

header("Content-Type: application/json");

if (!isset($_COOKIE['vendor_token'])) {
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$vid = base64_decode($_COOKIE['vendor_token']);


// TOTAL REVENUE
$r = $conn->query("
SELECT SUM(o.total) total_revenue
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE p.vendor_id=$vid
AND o.status='delivered'
");

$total_revenue = $r->fetch_assoc()['total_revenue'] ?? 0;


// TOTAL ORDERS
$r = $conn->query("
SELECT COUNT(*) total_orders
FROM orders o
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
");

$total_orders = $r->fetch_assoc()['total_orders'];


// DELIVERED
$r = $conn->query("
SELECT COUNT(*) delivered_orders
FROM orders o
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
AND o.status='delivered'
");

$delivered_orders = $r->fetch_assoc()['delivered_orders'];


// PENDING
$r = $conn->query("
SELECT COUNT(*) pending_orders
FROM orders o
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
AND o.status='pending'
");

$pending_orders = $r->fetch_assoc()['pending_orders'];


// ISSUES
$r = $conn->query("
SELECT COUNT(*) total_issues
FROM issues i
JOIN orders o ON i.order_id=o.id
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
");

$total_issues = $r->fetch_assoc()['total_issues'];


// TOP SELLING PRODUCT
$r = $conn->query("
SELECT p.title, SUM(o.qty) sold
FROM orders o
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
GROUP BY p.id
ORDER BY sold DESC
LIMIT 1
");

$top_product = $r->num_rows ? $r->fetch_assoc()['title'] : "-";


// HIGH REVENUE PRODUCT
$r = $conn->query("
SELECT p.title, SUM(o.total) rev
FROM orders o
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
GROUP BY p.id
ORDER BY rev DESC
LIMIT 1
");

$high_revenue_product = $r->num_rows ? $r->fetch_assoc()['title'] : "-";


// LOW STOCK
$r = $conn->query("
SELECT title
FROM products
WHERE vendor_id=$vid
ORDER BY stock ASC
LIMIT 1
");

$low_stock = $r->num_rows ? $r->fetch_assoc()['title'] : "-";


// MOST COMPLAINED
$r = $conn->query("
SELECT p.title, COUNT(i.id) total
FROM issues i
JOIN orders o ON i.order_id=o.id
JOIN products p ON o.product_id=p.id
WHERE p.vendor_id=$vid
GROUP BY p.id
ORDER BY total DESC
LIMIT 1
");

$most_complained = $r->num_rows ? $r->fetch_assoc()['title'] : "-";


// PRODUCT PERFORMANCE
$q = "
SELECT 

p.id,
p.title,
p.image,
p.stock,

IFNULL(SUM(o.qty),0) total_qty,
IFNULL(SUM(o.total),0) revenue,

(
SELECT COUNT(i.id)
FROM issues i
JOIN orders oo ON i.order_id=oo.id
WHERE oo.product_id=p.id
) complains

FROM products p

LEFT JOIN orders o ON p.id=o.product_id

WHERE p.vendor_id=$vid

GROUP BY p.id

ORDER BY revenue DESC
";

$res = $conn->query($q);

$products = [];

while($row = $res->fetch_assoc()){
    $products[] = $row;
}


echo json_encode([
    "status"=>"ok",

    "total_revenue"=>$total_revenue,
    "total_orders"=>$total_orders,
    "total_issues"=>$total_issues,

    "delivered_orders"=>$delivered_orders,
    "pending_orders"=>$pending_orders,

    "top_product"=>$top_product,
    "high_revenue_product"=>$high_revenue_product,
    "low_stock"=>$low_stock,
    "most_complained"=>$most_complained,

    "products"=>$products
]);
?>