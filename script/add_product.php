<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo "Unauthorized";
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

function clean($d) {
    return htmlspecialchars(trim($d));
}

$title = clean($_POST['title'] ?? '');
$category = clean($_POST['status'] ?? '');
$desc = clean($_POST['description'] ?? '');
$stock = $_POST['stock'] ?? '';
$price = $_POST['price'] ?? '';
$warranty = $_POST['warranty'] ?? 0;

// ===== VALIDATION =====
if (!$title || !$category || $stock === '' || $price === '') {
    echo "Required fields missing";
    exit;
}

if (!is_numeric($stock) || $stock < 0) {
    echo "Invalid stock";
    exit;
}

if (!is_numeric($price) || $price <= 0) {
    echo "Invalid price";
    exit;
}

if (!is_numeric($warranty) || $warranty < 0) {
    echo "Invalid warranty";
    exit;
}

// ===== IMAGE UPLOAD =====
$imagePath = "";

if (isset($_FILES['proImage']) && $_FILES['proImage']['error'] === 0) {

    $file = $_FILES['proImage'];

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ["jpg", "jpeg", "png", "webp"];

    if (!in_array($ext, $allowed)) {
        echo "Invalid image type";
        exit;
    }

    if ($file['size'] > 2 * 1024 * 1024) {
        echo "Image too large (2MB max)";
        exit;
    }

    $imageName = time() . "_" . uniqid() . "." . $ext;
    $uploadDir = "uploads/";

    if (!is_dir($uploadDir)) mkdir($uploadDir);

    move_uploaded_file($file['tmp_name'], $uploadDir . $imageName);

    $imagePath = $uploadDir . $imageName;
}

// ===== INSERT =====
$stmt = $conn->prepare("INSERT INTO products 
(vendor_id, title, category, description, stock, price, warranty, image) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param(
    "isssiids",
    $vendor_id,
    $title,
    $category,
    $desc,
    $stock,
    $price,
    $warranty,
    $imagePath
);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}
?>