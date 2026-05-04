<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $input = trim($_POST['logEmail']); // email OR mobile
    $pass = $_POST['logPass'];

    if (!$input || !$pass) {
        echo "All fields required";
        exit;
    }

    // find user
    $stmt = $conn->prepare("SELECT customer_id, password FROM customers 
                            WHERE email=? OR mobile=?");
    $stmt->bind_param("ss", $input, $input);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($row = $res->fetch_assoc()) {

        if ($pass === $row['password']) {

            // encode id
            $token = base64_encode($row['customer_id']);

            // set cookie
            setcookie("customer_token", $token, time() + (86400 * 7), "/");

            echo "success";
        } else {
            echo "Invalid Email or Password";
        }

    } else {
        echo "User not registered";
    }
}
?>