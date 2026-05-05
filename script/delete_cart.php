<?php
include "db.php";

$id = $_POST['cart_id'];

$conn->query("DELETE FROM cart WHERE id=$id");
echo "removed";