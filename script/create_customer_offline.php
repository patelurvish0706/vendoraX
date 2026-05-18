<?php

include "db.php";

header("Content-Type: application/json");

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$mobile = trim($_POST['mobile'] ?? '');
$address = trim($_POST['address'] ?? '');
$pincode = trim($_POST['pincode'] ?? '');
$lat = trim($_POST['lat'] ?? '');
$lng = trim($_POST['lng'] ?? '');

if(
    !$name ||
    !$mobile ||
    !$address
){
    echo json_encode([
        "status"=>"missing"
    ]);
    exit;
}

$fullAddress = $address;

if($pincode){
    $fullAddress .= " - ".$pincode;
}

/*
|--------------------------------------------------------------------------
| RANDOM PASSWORD
|--------------------------------------------------------------------------
*/

$pass = substr(str_shuffle(
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789@#"
), 0, 10);

$stmt = $conn->prepare("
INSERT INTO customers
(name,email,mobile,address,password,latitude,longitude)
VALUES(?,?,?,?,?,?,?)
");

$stmt->bind_param(
    "sssssss",
    $name,
    $email,
    $mobile,
    $fullAddress,
    $pass,
    $lat,
    $lng
);

if($stmt->execute()){

    echo json_encode([
        "status"=>"ok",
        "customer_id"=>$stmt->insert_id,
        "password"=>$pass
    ]);

}else{

    echo json_encode([
        "status"=>"error"
    ]);

}

?>