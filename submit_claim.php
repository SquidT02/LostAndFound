<?php
$conn = new mysqli("localhost", "root", "", "lost_and_found");
if ($conn->connect_error) die("Connection failed");

$item_id = $_POST['item_id'];
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$sql = "INSERT INTO item_claims (item_id, claimant_name, claimant_email, message)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $item_id, $name, $email, $message);
$stmt->execute();

echo "Claim submitted! Waiting for approval.";

$stmt->close();
$conn->close();
?>
