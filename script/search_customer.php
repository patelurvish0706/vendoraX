<?php

include "db.php";

header("Content-Type: application/json");

$search = trim($_POST['search'] ?? '');

if(!$search){
    echo json_encode([
        "status"=>"empty"
    ]);
    exit;
}

$stmt = $conn->prepare("
SELECT *
FROM customers
WHERE mobile LIKE ?
OR email LIKE ?
LIMIT 10
");

$s = "%$search%";

$stmt->bind_param("ss",$s,$s);
$stmt->execute();

$res = $stmt->get_result();

$data = [];

while($r = $res->fetch_assoc()){
    $data[] = $r;
}

echo json_encode([
    "status"=>"ok",
    "data"=>$data
]);

?>