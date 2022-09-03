<?php
if(!isset($_GET("submit"))){
    echo("error")
}

$to = 'tomiwasemilore@gmail.com';
$name = $_GET["name"];
$subject = $_GET["subject"];
$message = $_GET["message"]; 
$from = $_GET["email"];

// Sending email
if(empty($name)||empty($message)){
    echo("Name and Message important");
}

mail($to, $subject, $message);

if(mail($to, $subject, $message)){
    echo 'Your mail has been sent successfully.';
} else{
    echo 'Unable to send email. Please try again.';
}
// echo "i am new here please show me around";



?>