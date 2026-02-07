
<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "lost_and_found";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed");
}

// Get most recent item
$sql = "SELECT id, item_name, description, image, date_reported
        FROM lost_items
        ORDER BY date_reported DESC
        LIMIT 1";

$result = $conn->query($sql);

if ($row = $result->fetch_assoc()) {
  $item = [
    "id" => $row["id"],
    "name" => $row["item_name"],
    "description" => $row["description"],
    "image" => $row["image"]
      ? "data:image/jpeg;base64," . base64_encode($row["image"])
      : null,
    "dateReported" => $row["date_reported"]
  ];

  echo json_encode($item);
} else {
  echo json_encode([]);
}

$conn->close();
?>
