<?php
include "db.php";

// CUSTOMER ID
if (isset($_POST['customer_id'])) {

    // offline vendor sale
    $customer_id = (int)$_POST['customer_id'];

} else {

    // normal customer order
    if (!isset($_COOKIE['customer_token'])) {
        echo "Login required";
        exit;
    }

    $customer_id = base64_decode($_COOKIE['customer_token']);
}

// DATA
$product_id = (int)($_POST['product_id'] ?? 0);
$qty = (int)($_POST['qty'] ?? 0);
$type = trim($_POST['type'] ?? "");

// VALIDATION
if (!$product_id || !$qty || !$type) {
    echo "Invalid data";
    exit;
}

// GET PRODUCT
$res = $conn->query("
    SELECT 
        id,
        price,
        stock
    FROM products
    WHERE id = $product_id
");

if (!$res || !$res->num_rows) {
    echo "Product not found";
    exit;
}

$product = $res->fetch_assoc();

// STOCK CHECK
if ($qty > $product['stock']) {
    echo "Stock not available";
    exit;
}

$total = $qty * $product['price'];

// ============================
// ADD TO CART
// ============================

if ($type === "cart") {

    // CHECK EXISTING CART ITEM
    $check = $conn->query("
        SELECT id, qty 
        FROM cart
        WHERE customer_id = $customer_id
        AND product_id = $product_id
    ");

    if ($check && $check->num_rows) {

        $cartItem = $check->fetch_assoc();

        $newQty = $cartItem['qty'] + $qty;

        if ($newQty > $product['stock']) {
            echo "Stock limit reached";
            exit;
        }

        $conn->query("
            UPDATE cart
            SET qty = $newQty
            WHERE id = {$cartItem['id']}
        ");

        echo "Cart updated";

    } else {

        $stmt = $conn->prepare("
            INSERT INTO cart
            (customer_id, product_id, qty)
            VALUES (?, ?, ?)
        ");

        $stmt->bind_param(
            "iii",
            $customer_id,
            $product_id,
            $qty
        );

        if ($stmt->execute()) {
            echo "Added to cart";
        } else {
            echo "Cart error";
        }
    }

// ============================
// NORMAL BUY + OFFLINE BUY
// ============================

} elseif ($type === "buy" || $type === "offline_buy") {

    // OFFLINE PURCHASE
    if ($type === "offline_buy") {

        $status = "delivered";

        $stmt = $conn->prepare("
            INSERT INTO orders
            (
                customer_id,
                product_id,
                qty,
                total,
                status,
                ordered_at,
                delivered_at
            )
            VALUES
            (
                ?, ?, ?, ?, ?,
                NOW(),
                NOW()
            )
        ");

        $stmt->bind_param(
            "iiids",
            $customer_id,
            $product_id,
            $qty,
            $total,
            $status
        );

    } else {

        // NORMAL ONLINE ORDER
        $stmt = $conn->prepare("
            INSERT INTO orders
            (
                customer_id,
                product_id,
                qty,
                total
            )
            VALUES
            (
                ?, ?, ?, ?
            )
        ");

        $stmt->bind_param(
            "iiid",
            $customer_id,
            $product_id,
            $qty,
            $total
        );
    }

    if ($stmt->execute()) {

        // REDUCE STOCK
        $update = $conn->query("
            UPDATE products
            SET stock = stock - $qty
            WHERE id = $product_id
        ");

        if ($update) {

            echo "Order placed";

        } else {

            echo "Stock update failed";
        }

    } else {

        echo "Order failed";
    }

// ============================
// INVALID TYPE
// ============================

} else {

    echo "Invalid type";
}
?>