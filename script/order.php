<?php
include "db.php";

// echo "STEP 1: Start\n";

if (!isset($_COOKIE['customer_token'])) {
    echo "Login required"; exit;
}

$customer_id = base64_decode($_COOKIE['customer_token']);
// echo "Customer ID: $customer_id\n";

$product_id = $_POST['product_id'] ?? null;
$qty = (int)($_POST['qty'] ?? 0);
$type = $_POST['type'] ?? "";

// echo "STEP 2: Data\n";
// print_r($_POST);

if (!$product_id || !$qty) {
    echo "Invalid data"; exit;
}

// get product
$res = $conn->query("SELECT price, stock FROM products WHERE id=$product_id");
$p = $res->fetch_assoc();

if (!$p) {
    echo "Product not found"; exit;
}

if ($qty > $p['stock']) {
    echo "Stock not available"; exit;
}

$total = $qty * $p['price'];

// echo "STEP 3: Type = $type\n";

if ($type === "cart") {

    $stmt = $conn->prepare("INSERT INTO cart (customer_id, product_id, qty) VALUES (?,?,?)");
    $stmt->bind_param("iii", $customer_id, $product_id, $qty);

    echo $stmt->execute() ? "Added to cart" : "Error cart";

} elseif ($type === "buy") {

    // insert order
    $stmt = $conn->prepare("INSERT INTO orders (customer_id, product_id, qty, total) VALUES (?,?,?,?)");
    $stmt->bind_param("iiid", $customer_id, $product_id, $qty, $total);

    if ($stmt->execute()) {

        // reduce stock
        $conn->query("UPDATE products SET stock = stock - $qty WHERE id=$product_id");

        echo "Order placed";
    } else {
        echo "Order failed";
    }

} else {
    echo "Invalid type";
}
?>