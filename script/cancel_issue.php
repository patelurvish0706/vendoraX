<?php
include "db.php";

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM issues WHERE id=?");
$stmt->bind_param("i",$id);

echo $stmt->execute() ? "Cancelled" : "Error";
?>