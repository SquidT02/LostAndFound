<?php

$conn = new mysqli("localhost", "root", "", "lost_and_found");

$result = $conn->query("
  SELECT c.id, c.item_id, c.claimant_name, c.message, l.item_name
  FROM item_claims c
  JOIN lost_items l ON c.item_id = l.id
  WHERE c.status = 'pending'
");

while ($row = $result->fetch_assoc()) {
  echo "<h3>{$row['item_name']}</h3>";
  echo "<p>{$row['claimant_name']}: {$row['message']}</p>";
  echo "
    <a href='resolve_claim.php?id={$row['id']}&action=approve'>Approve</a> |
    <a href='resolve_claim.php?id={$row['id']}&action=deny'>Deny</a>
    <hr>
  ";
}
?>
