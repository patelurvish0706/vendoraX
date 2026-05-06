<?php
include "db.php";

header("Content-Type: application/json");

if (!isset($_COOKIE['customer_token'])) {
    echo json_encode(["status"=>"invalid"]);
    exit;
}

$cid = base64_decode($_COOKIE['customer_token']);
$km  = floatval($_POST['km']); // 👈 radius from JS

// get customer location
$cq = $conn->query("SELECT latitude, longitude FROM customers WHERE customer_id=$cid");
$c = $cq->fetch_assoc();

if (!$c || !$c['latitude'] || !$c['longitude']) {
    echo json_encode(["status"=>"no_location"]);
    exit;
}

$lat = $c['latitude'];
$lng = $c['longitude'];

// ✅ Haversine filter here
$q = "
SELECT vendor_id, shop_name, address, shop_lati, shop_long,
(
  6371 * acos(
    cos(radians($lat)) *
    cos(radians(shop_lati)) *
    cos(radians(shop_long) - radians($lng)) +
    sin(radians($lat)) *
    sin(radians(shop_lati))
  )
) AS distance
FROM vendors
WHERE shop_lati IS NOT NULL AND shop_long IS NOT NULL
HAVING distance <= $km
ORDER BY distance ASC
";

$res = $conn->query($q);

$vendors = [];

while($v = $res->fetch_assoc()){
    $vendors[] = $v;
}

echo json_encode([
    "status"=>"ok",
    "user"=>[
        "lat"=>$lat,
        "lng"=>$lng
    ],
    "vendors"=>$vendors
]);