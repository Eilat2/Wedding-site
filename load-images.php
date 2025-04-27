<?php
$file = 'images.json';
if (file_exists($file)) {
    $images = json_decode(file_get_contents($file), true);
    echo json_encode($images);
} else {
    echo json_encode([]);
}
?>
