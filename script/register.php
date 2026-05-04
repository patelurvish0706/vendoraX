<?php
include "db.php";
include "crypto.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // get data
    $sname = trim($_POST['sname']);
    $vname = trim($_POST['vname']);
    $email = trim($_POST['vemail']);
    $mobile = trim($_POST['vmobile']);
    $pass = $_POST['pass'];
    $repass = $_POST['repass'];
    $address = trim($_POST['address']);

    // validation
    if (!$sname || !$vname || !$email || !$mobile || !$pass || !$repass) {
        echo "All * fields required";
        exit;
    }

    if (strlen($vname) < 3) {
        echo "Vendor name must be 3+ chars";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email";
        exit;
    }

    if (strlen($pass) < 6) {
        echo "Password min 6 chars";
        exit;
    }

    if ($pass !== $repass) {
        echo "Passwords not match";
        exit;
    }

    // check email exists
    $check = $conn->prepare("SELECT vendor_id FROM vendors WHERE vendor_email=?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "Email already exists";
        exit;
    }

    // insert
    $stmt = $conn->prepare("INSERT INTO vendors 
        (vendor_name, shop_name, vendor_phone, vendor_email, vendor_password, address) 
        VALUES (?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ssssss", $vname, $sname, $mobile, $email, $pass, $address);

    if ($stmt->execute()) {
        $vendor_id = $stmt->insert_id;

    // simple encryption (base64)
        $token = base64_encode($vendor_id);

        setcookie("vendor_token", $token, time() + (86400 * 7), "/"); // 7 days

        echo "success";

    } else {
        echo "error";
    }
}
?>