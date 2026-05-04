<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST['uname']);
    $email = trim($_POST['email']);
    $mobile = trim($_POST['mobile']);
    $pass = $_POST['pass'];
    $repass = $_POST['repass'];
    $pincode = trim($_POST['pincode']);
    $address = trim($_POST['address']);

    if (!$name || !$email || !$mobile || !$pass || !$repass) {
        echo "All * fields required";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email";
        exit;
    }

    if ($pass !== $repass) {
        echo "Password not match";
        exit;
    }

    // append pincode to address
    if ($pincode) {
        $address = $address . " - " . $pincode;
    }

    // check existing
    $check = $conn->prepare("SELECT customer_id FROM customers WHERE email=? OR mobile=?");
    $check->bind_param("ss", $email, $mobile);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "User already exists";
        exit;
    }

    $lat = $_POST['lat'] ?? null;
    $lng = $_POST['lng'] ?? null;

    // insert
    $stmt = $conn->prepare("INSERT INTO customers 
    (name,email,mobile,password,address,latitude,longitude) 
    VALUES (?,?,?,?,?,?,?)");

    $stmt->bind_param("sssssss", 
        $name, $email, $mobile, $pass, $address, $lat, $lng
    );
        if ($stmt->execute()) {

        $id = $stmt->insert_id;

        // simple encoded cookie
        $token = base64_encode($id);
        setcookie("customer_token", $token, time() + (86400 * 7), "/");

        echo "success";
    } else {
        echo "error";
    }
}
?>