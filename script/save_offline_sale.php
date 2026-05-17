<?php

include "db.php";

header("Content-Type: application/json");

if(!isset($_COOKIE['vendor_token'])){
    echo json_encode([
        "status"=>"invalid"
    ]);
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

$customer_id = $_POST['customer_id'] ?? '';
$products = $_POST['products'] ?? '';

if(!$customer_id || !$products){
    echo json_encode([
        "status"=>"missing"
    ]);
    exit;
}

$products = json_decode($products,true);

foreach($products as $p){

    $product_id = $p['product_id'];
    $qty = $p['qty'];

    $stmt = $conn->prepare("
    SELECT *
    FROM products
    WHERE id=?
    ");

    $stmt->bind_param("i",$product_id);
    $stmt->execute();

    $res = $stmt->get_result();

    if($res->num_rows == 0){
        continue;
    }

    $pro = $res->fetch_assoc();

    if($pro['stock'] < $qty){
        continue;
    }

    $price = $pro['price'];
    $total = $price * $qty;

    $ins = $conn->prepare("
    INSERT INTO offline_sales
    (
        vendor_id,
        customer_id,
        product_id,
        qty,
        price,
        total
    )
    VALUES(?,?,?,?,?,?)
    ");

    $ins->bind_param(
        "iiiidd",
        $vendor_id,
        $customer_id,
        $product_id,
        $qty,
        $price,
        $total
    );

    $ins->execute();

    $newStock = $pro['stock'] - $qty;

    $up = $conn->prepare("
    UPDATE products
    SET stock=?
    WHERE id=?
    ");

    $up->bind_param(
        "ii",
        $newStock,
        $product_id
    );

    $up->execute();
}

echo json_encode([
    "status"=>"ok"
]);

?>