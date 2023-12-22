<?php
include 'DbConnection.php';
//=========================== Echo data from the database in json form. ================================== 
try {

    $data = "SELECT * FROM PreppedTable";
    $result = $pdo->query($data);

    $datainfo = $result->fetchAll(PDO::FETCH_ASSOC);

    foreach ($datainfo as $item) {
        $item["Prepped_value"] = trim($item["Prepped_value"]);
    }
    //var_dump($datainfo);

    $n = json_encode($datainfo, JSON_UNESCAPED_SLASHES);
    if ($n !== false) {
        echo $n;

    } else {
        echo "Encoding error";
    }
    $pdo = null;
} catch (PDOException $e) {
    echo 'Connection interuptted' . $e->getMessage();
}
