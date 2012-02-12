<?php
try {
    $db = new PDO("pgsql:dbname=rei;host=localhost", "rei", "S+r@1ght&narr0w");
    $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch(PDOException $e) {
    echo $e->getMessage();
}
?>