<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST['logEmail']);
    $pass = $_POST['logPass'];

    if (!$email || !$pass) {
        echo "All fields required";
        exit;
    }

    // check by email OR mobile
    $stmt = $conn->prepare("SELECT vendor_id, vendor_password FROM vendors 
                            WHERE vendor_email=? OR vendor_phone=?");
    $stmt->bind_param("ss", $email, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {

        if ($pass === $row['vendor_password']) {

            // set cookie
            $token = base64_encode($row['vendor_id']);
            setcookie("vendor_token", $token, time() + (86400 * 7), "/");

            echo "success";
        } else {
            echo "Wrong password";
        }

    } else {
        echo "User not found";
    }
}
?>