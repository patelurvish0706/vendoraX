<?php

include "db.php";

header("Content-Type: application/json");

require __DIR__ . "/../vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// echo $_ENV['MAIL_HOST'];
// exit;

$email = trim($_POST['email'] ?? '');

if (!$email) {

    echo json_encode([
        "status" => "error",
        "message" => "Email Required"
    ]);
    exit;
}

$stmt = $conn->prepare("
SELECT name, email, password
FROM customers
WHERE email=?
LIMIT 1
");

$stmt->bind_param("s", $email);

$stmt->execute();

$res = $stmt->get_result();

if (!$res->num_rows) {

    echo json_encode([
        "status" => "error",
        "message" => "Customer Not Found"
    ]);
    exit;
}

$user = $res->fetch_assoc();

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();

    $mail->Host = $_ENV['MAIL_HOST'];

    $mail->SMTPAuth = true;

    $mail->Username = $_ENV['MAIL_USER'];

    $mail->Password = $_ENV['MAIL_PASS'];

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    $mail->Port = $_ENV['MAIL_PORT'];

    $mail->setFrom($_ENV['MAIL_USER'], "VendoraX");

    $mail->addAddress($user['email'], $user['name']);

    $mail->isHTML(true);

    $mail->Subject = "VendoraX Password Recovery";

    $mail->Body = "
    <div style='font-family:Arial;padding:20px;'>

        <h2 style='color:#4c6381;'>
            Password Recovery
        </h2>

        <p>Hello <b>{$user['name']}</b>,</p>

        <p>Your account password details are:</p>

        <div style='
            background:#f4f7fb;
            padding:15px;
            border-radius:10px;
        '>

            <p>
                <b>Email:</b> {$user['email']}
            </p>

            <p>
                <b>Password:</b> {$user['password']}
            </p>

        </div>

        <p style='margin-top:20px;'>
            Thank You,<br>
            VendoraX
        </p>

    </div>
    ";

    $mail->send();

    echo json_encode([
        "status" => "ok"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Mail Send Failed"
    ]);
}
?>