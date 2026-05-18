<?php

require __DIR__ . "../vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

// echo $_ENV['MAIL_HOST'];
// exit;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($to, $subject, $htmlBody)
{
    $env = parse_ini_file(__DIR__ . "/.env");

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
$mail->Host = $_ENV['MAIL_HOST'];

$mail->Username = $_ENV['MAIL_USER'];

$mail->Password = $_ENV['MAIL_PASS'];

$mail->Port = $_ENV['MAIL_PORT']; 
        $mail->SMTPAuth   = true; 
        $mail->Password   = $env['MAIL_PASS'];

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 

        $mail->setFrom(
    $_ENV['MAIL_USER'],
    $_ENV['MAIL_FROM_NAME']
);

        $mail->addAddress($to);

        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;

        return $mail->send();

    } catch (Exception $e) {

        return false;
    }
}
?>