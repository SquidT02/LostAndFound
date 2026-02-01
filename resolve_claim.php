<?php
session_start();

/* ===== DB CONNECTION ===== */
$conn = new mysqli("localhost", "root", "", "lost_and_found");
if ($conn->connect_error) {
    die("Database connection failed");
}

/* ===== VALIDATE INPUT ===== */
if (!isset($_GET['id'], $_GET['action'])) {
    die("Invalid request");
}

$claim_id = (int) $_GET['id'];
$action = $_GET['action'];

if (!in_array($action, ['approve', 'deny'])) {
    die("Invalid action");
}

/* ===== HANDLE ACTION ===== */
if ($action === 'approve') {

    // Mark claim as approved
    $stmt = $conn->prepare("UPDATE item_claims SET status = 'approved' WHERE id = ?");
    $stmt->bind_param("i", $claim_id);
    $stmt->execute();

    // Get item_id from claim
    $item_stmt = $conn->prepare("SELECT item_id FROM item_claims WHERE id = ?");
    $item_stmt->bind_param("i", $claim_id);
    $item_stmt->execute();
    $item_result = $item_stmt->get_result()->fetch_assoc();

    // Mark item as resolved
    if ($item_result) {
        $item_id = $item_result['item_id'];
        $conn->query("UPDATE lost_items SET status = 'resolved' WHERE id = $item_id");
    }

} else {
    // Deny claim
    $stmt = $conn->prepare("UPDATE item_claims SET status = 'denied' WHERE id = ?");
    $stmt->bind_param("i", $claim_id);
    $stmt->execute();
}

/* ===== REDIRECT BACK ===== */
header("Location: admin_claims.php");
exit;
