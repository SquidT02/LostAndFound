<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "lost_and_found";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  echo json_encode(["error" => "Database connection failed"]);
  exit;
}


$itemName = $_POST['itemName'];
$description = $_POST['description'];
$image = null;

if (isset($_FILES['image']) && $_FILES['image']['size'] > 0) {
  $image = file_get_contents($_FILES['image']['tmp_name']);
}

$stmt = $conn->prepare(
  "INSERT INTO lost_items (item_name, description, image, date_reported)
   VALUES (?, ?, ?, NOW())"
);

$stmt->bind_param("ssb", $itemName, $description, $image);
$stmt->send_long_data(2, $image);

if ($stmt->execute()) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error"]);
}

$stmt->close();
$conn->close();
?>
