<?php
include "db.php";

$order_id = $_POST['order_id'];
$msg = $_POST['msg'];

$conn->query("INSERT INTO issues (order_id, message) VALUES ($order_id, '$msg')");

echo "Issue submitted";