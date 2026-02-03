
<?php
$conn = new mysqli("localhost", "root", "", "lost_and_found");
if ($conn->connect_error) {
    die("Database connection failed");
}

if (!isset($_GET['id'], $_GET['action'])) {
    die("Invalid request");
}

$claim_id = (int) $_GET['id'];
$action = $_GET['action'];

if (!in_array($action, ['approve', 'deny'])) {
    die("Invalid action");
}

/* Get item_id from claim */
$stmt = $conn->prepare("SELECT item_id FROM item_claims WHERE id = ?");
$stmt->bind_param("i", $claim_id);
$stmt->execute();
$result = $stmt->get_result();
$claim = $result->fetch_assoc();

if (!$claim) {
    die("Claim not found");
}

$item_id = $claim['item_id'];

if ($action === 'approve') {

    // Delete all claims for this item
    $stmt = $conn->prepare("DELETE FROM item_claims WHERE item_id = ?");
    $stmt->bind_param("i", $item_id);
    $stmt->execute();

    // Delete the lost item itself
    $stmt = $conn->prepare("DELETE FROM lost_items WHERE id = ?");
    $stmt->bind_param("i", $item_id);
    $stmt->execute();

} else {

    // Deny ONLY this claim
    $stmt = $conn->prepare("UPDATE item_claims SET status = 'denied' WHERE id = ?");
    $stmt->bind_param("i", $claim_id);
    $stmt->execute();
}

header("Location: admin_claims.php");
exit;

