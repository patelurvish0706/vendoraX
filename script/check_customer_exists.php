<?php

include "db.php";

$email = trim($_POST["email"] ?? "");
$mobile = trim($_POST["mobile"] ?? "");

if(!$email && !$mobile){
    echo json_encode([
        "status" => "not_found"
    ]);
    exit;
}

$sql = "SELECT * FROM customers 
        WHERE email='$email' 
        OR mobile='$mobile'
        LIMIT 1";

$res = mysqli_query($conn, $sql);

if(mysqli_num_rows($res) > 0){

    $data = mysqli_fetch_assoc($res);

    echo json_encode([
        "status" => "exists",
        "data" => [
            "customer_id" => $data["customer_id"],
            "name" => $data["name"],
            "email" => $data["email"],
            "mobile" => $data["mobile"]
        ]
    ]);

}else{

    echo json_encode([
        "status" => "not_found"
    ]);
}
?>