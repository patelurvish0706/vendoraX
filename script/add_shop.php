<?php
include "db.php";

if (!isset($_COOKIE['vendor_token'])) {
    echo "Unauthorized";
    exit;
}

$vendor_id = base64_decode($_COOKIE['vendor_token']);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    function clean($data) {
        return htmlspecialchars(trim($data));
    }

    $sname = clean($_POST['sname'] ?? '');
    $vname = clean($_POST['vname'] ?? '');
    $email = clean($_POST['vemail'] ?? '');
    $mobile = clean($_POST['vmobile'] ?? '');
    $pass = $_POST['pass'] ?? '';
    $desc = clean($_POST['description'] ?? '');
    $lat = $_POST['lat'] ?? '';
    $lng = $_POST['lng'] ?? '';
    $open = $_POST['open'] ?? '';
    $close = $_POST['close'] ?? '';
    $address = clean($_POST['address'] ?? '');

    // ===== VALIDATIONS =====

    if (!$sname || !$vname || !$email || !$mobile || !$pass || !$lat || !$lng || !$open || !$close || !$address) {
        echo "All * fields required";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email";
        exit;
    }

    if (!preg_match('/^[0-9]{10}$/', $mobile)) {
        echo "Invalid mobile number";
        exit;
    }

    if (strlen($pass) < 6) {
        echo "Password must be at least 6 characters";
        exit;
    }

    if (!is_numeric($lat) || !is_numeric($lng)) {
        echo "Invalid location";
        exit;
    }

    if (strtotime($open) >= strtotime($close)) {
        echo "Opening time must be before closing time";
        exit;
    }

    // ===== CHECK VENDOR =====
    $check = $conn->prepare("SELECT vendor_id FROM vendors WHERE vendor_id=?");
    $check->bind_param("i", $vendor_id);
    $check->execute();
    $res = $check->get_result();

    if ($res->num_rows == 0) {
        echo "Vendor not found";
        exit;
    }

    // ===== UPDATE =====
    $openClose = $open . " - " . $close;

    // optional: hash password
    // $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("UPDATE vendors SET 
        vendor_name=?, 
        shop_name=?, 
        vendor_phone=?, 
        vendor_email=?, 
        vendor_password=?, 
        Shop_desc=?, 
        shop_open_close=?, 
        shop_long=?, 
        Shop_lati=?, 
        address=? 
        WHERE vendor_id=?");

    $stmt->bind_param("ssssssssssi",
        $vname,
        $sname,
        $mobile,
        $email,
        $pass,
        $desc,
        $openClose,
        $lng,
        $lat,
        $address,
        $vendor_id
    );

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }
}
?>