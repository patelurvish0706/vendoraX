<?php
include "db.php";

$id = $_POST['id'];
$status = $_POST['status'];

$allowed = ['pending','processing','approved','resolved'];

if(!in_array($status,$allowed)){
    echo "Invalid"; exit;
}

$stmt = $conn->prepare("UPDATE issues SET status=? WHERE id=?");
$stmt->bind_param("si",$status,$id);

echo $stmt->execute() ? "Updated" : "Error";
?>