<?php
include "db.php";

$id = $_POST['cart_id'];
$qty = $_POST['qty'];

$conn->query("UPDATE cart SET qty=$qty WHERE id=$id");
echo "updated";