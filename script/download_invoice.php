<?php
include "db.php";

if (!isset($_COOKIE['customer_token'])) {
    die("Login Required");
}

$cid = base64_decode($_COOKIE['customer_token']);

$order_id = intval($_GET['order_id']);

$q = "
SELECT 
o.*,

p.title,
p.description,
p.category,
p.price,
p.warranty,
p.image,

v.vendor_name AS vendor_name,
v.vendor_phone AS vendor_phone,
v.shop_name,
v.address AS shop_address,

c.name,
c.mobile,
c.address

FROM orders o

JOIN products p ON o.product_id = p.id
JOIN vendors v ON p.vendor_id = v.vendor_id
JOIN customers c ON o.customer_id = c.customer_id

WHERE o.id=$order_id
AND o.customer_id=$cid
";

$res = $conn->query($q);

if(!$res->num_rows){
    die("Invalid Invoice");
}

$p = $res->fetch_assoc();


// ✅ warranty last date
$warranty_end = "-";

if($p['delivered_at']){
    $warranty_end = date(
        "d M Y h:i A",
        strtotime("+".$p['warranty']." months", strtotime($p['delivered_at']))
    );
}


// ✅ issues
$issues = [];

$iq = $conn->query("
SELECT issue, status, created_at
FROM issues
WHERE order_id=$order_id
ORDER BY id DESC
");

while($i = $iq->fetch_assoc()){
    $issues[] = $i;
}

?>
<!DOCTYPE html>
<html>
<head>
<title>Invoice</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">
<style>

body{
    font-family: "Montserrat Alternates", sans-serif;
    padding:10px;
    color:#4c6381;
    font-size:12px;
    background:#fff;
}

.box{
    border:1px solid #dbe5f1;
    border-radius:6px;
    padding:8px 10px;
    margin-bottom:8px;
    page-break-inside: avoid;
}

h2,h3{
    margin:0 0 6px 0;
    font-size:14px;
    color:#4c6381;
}

table{
    width:100%;
    border-collapse:collapse;
}

td{
    padding:4px 6px;
    border-bottom:1px solid #edf2f7;
    vertical-align:top;
    font-size:11px;
}

img{
    width:80px;
    border-radius:6px;
    border:1px solid #dbe5f1;
    padding:3px;
}

.issue{
    border:1px solid #dbe5f1;
    border-radius:5px;
    padding:6px 8px;
    margin-top:5px;
    font-size:11px;
}

.issue p{
    margin:3px 0;
}

button{
    padding:7px 14px;
    border:none;
    background:#4c6381;
    color:#fff;
    border-radius:5px;
    cursor:pointer;
    font-size:11px;
    margin-top:5px;
}

.printInfo{
    margin-top:6px;
    font-size:10px;
}

#navbar {
    display: flex;
    justify-content: space-between;
    color: #4c6381;
    padding: 10px 20px;
    align-items: center;
    user-select: none;
}

#Navlogo {
    color: #4c6381;
    display: flex;
    align-items: center;
    font-family: "Montserrat Alternates", sans-serif;
}

#Navlogo #VX {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1.2rem;
}

#Navlogo #endora {
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 2px -1px 0;
}

#Navlogo #tagline {
    font-size: 0.58rem;
    margin-left: 6px;
    align-self: center;
}

#cornerStart {
    align-self: flex-end;
    margin: 0 0px -3px 0;
    font-size: 0.55rem;
}

#cornerEnd {
    align-self: flex-start;
    margin: -3px 0 0 1px;
    font-size: 0.55rem;
}

@media print{

    body{
        padding:0;
        font-size:12px;
    }

    .box{
        margin-bottom:5px;
        padding:6px 8px;
    }

    button{
        display:none;
    }

    img{
        width:70px;
    }
}

</style>

</head>

<body>


<div id="Navlogo" style="margin:0 0 15px 0;">
    <div id="cornerStart">◣</div>

    <div id="VX">V</div>
    <div id="endora">endora</div>
    <div id="VX">X</div>
    <div id="tagline">Buy easy.<br>Service assured.</div>

    <div id="cornerEnd">◥</div>
</div>

<div class="box">



<h2>INVOICE</h2>

<table>

<tr>
<td style="width:120px;">Invoice Date</td>
<td><b><?php echo date("d M Y h:i A"); ?></b></td>
</tr>

<tr>
<td>Order Status</td>
<td><b><?php echo strtoupper($p['status']); ?></b></td>
</tr>

</table>

</div>


<div class="box">

<h3>Product Details</h3>

<table>

<tr>
<td style="width:120px;">Image</td>
<td>
<img src="./<?php echo $p['image']; ?>" alt="product">
</td>
</tr>

<tr>
<td>Product</td>
<td><b><?php echo $p['title']; ?></b></td>
</tr>

<tr>
<td>Category</td>
<td><?php echo $p['category']; ?></td>
</tr>

<tr>
<td>Description</td>
<td><?php echo $p['description']; ?></td>
</tr>

<tr>
<td>Price</td>
<td>₹<?php echo $p['price']; ?></td>
</tr>

<tr>
<td>Quantity</td>
<td><?php echo $p['qty']; ?></td>
</tr>

<tr>
<td>Total</td>
<td><b>₹<?php echo $p['total']; ?></b></td>
</tr>

<tr>
<td>Payment</td>
<td><b>Cash On Delivery</b></td>
</tr>

<tr>
<td>Warranty</td>
<td><?php echo $p['warranty']; ?> Months</td>
</tr>

<tr>
<td>Warranty Valid Till</td>
<td><b><?php echo $warranty_end; ?></b></td>
</tr>

</table>

</div>


<div class="box">

<h3>Shop & Vendor</h3>

<table>

<tr>
<td style="width:120px;">Shop</td>
<td><?php echo $p['shop_name']; ?></td>
</tr>

<tr>
<td>Vendor</td>
<td><?php echo $p['vendor_name']; ?></td>
</tr>

<tr>
<td>Phone</td>
<td><?php echo $p['vendor_phone']; ?></td>
</tr>

<tr>
<td>Address</td>
<td><?php echo $p['shop_address']; ?></td>
</tr>

</table>

</div>


<div class="box">

<h3>Customer</h3>

<table>

<tr>
<td style="width:120px;">Name</td>
<td><?php echo $p['name']; ?></td>
</tr>

<tr>
<td>Phone</td>
<td><?php echo $p['mobile']; ?></td>
</tr>

<tr>
<td>Address</td>
<td><?php echo $p['address']; ?></td>
</tr>

</table>

</div>


<div class="box">

<h3>Order Dates</h3>

<table>

<tr>
<td style="width:120px;">Ordered On</td>
<td><?php echo $p['ordered_at']; ?></td>
</tr>

<tr>
<td>Delivered On</td>
<td><?php echo $p['delivered_at']; ?></td>
</tr>

</table>

</div>


<div class="box">

<h3>Issues Raised</h3>

<?php if(count($issues)==0){ ?>

<p style="margin:0;">No Issues Raised</p>

<?php } else { ?>

<?php foreach($issues as $i){ ?>

<div class="issue">

<p>
<b>Issue:</b>
<?php echo $i['issue']; ?>
</p>

<p>
<b>Status:</b>
<?php echo strtoupper($i['status']); ?>
</p>

<p>
<b>Date:</b>
<?php echo $i['created_at']; ?>
</p>

</div>

<?php } ?>

<?php } ?>

</div>

<button onclick="window.print()">
Print Invoice
</button>

</body>
</html>