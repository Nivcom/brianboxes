<?php
//================== Connecting to the Server and Database.=========================================
$dbhost = "127.0.0.1";
$dbuser = "production_database";
$dbpass = "production";
$dbname = "PreppedItems";

try {
    $pdo = new PDO("sqlsrv:Server=$dbhost;Database=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Database Connected Successfully : )";
} catch (PDOException $e) {
    echo "Connection failed:" . $e->getMessage();

}

?>