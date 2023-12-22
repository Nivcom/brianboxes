<?php
try {
    // =============================== Insert Data into new fields into the database or update already existing fields. ==============================
    if (!empty($_POST["prodG"])) {
        include 'DbConnection.php';

        // prepared statements to prevent SQL injection
        $stmt = $pdo->prepare("UPDATE PreppedTable SET Prepped_value = ?, Comments = ? WHERE Product_ID = ?");
        $stmt->execute([$_POST['preppedvalue'], $_POST['comments'], $_POST['prodG']]);

        // Check if the update affected any rows, if not, perform an INSERT
        if ($stmt->rowCount() == 0) {
            $stmt = $pdo->prepare("INSERT INTO PreppedTable (Product_ID, Prepped_value, Comments) VALUES (?, ?, ?)");
            $stmt->execute([$_POST['prodG'], $_POST['preppedvalue'], $_POST['comments']]);
        }
    }
    // Close the database connection
    $pdo = null;

} catch (PDOException $e) {
    echo 'Connection interrupted: ' . $e->getMessage();
}
?>