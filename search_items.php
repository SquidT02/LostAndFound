<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "lost_and_found";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed");
}

$query = $_GET['q'] ?? "";

// Prepared statement for safety
$sql = "SELECT id, item_name, description, image, date_reported
        FROM lost_items
        WHERE item_name LIKE ? OR description LIKE ?
        ORDER BY date_reported DESC";

$stmt = $conn->prepare($sql);
$search = "%" . $query . "%";
$stmt->bind_param("ss", $search, $search);
$stmt->execute();

$result = $stmt->get_result();
$items = [];

while ($row = $result->fetch_assoc()) {
  $items[] = [
    "name" => $row["item_name"],
    "description" => $row["description"],
    "image" => $row["image"]
      ? "data:image/jpeg;base64," . base64_encode($row["image"])
      : null,
    "dateReported" => $row["date_reported"]
  ];
}

echo json_encode($items);

$stmt->close();
$conn->close();
?>
