<?php
// קובץ JSON שבו נשמור את התמונות
$jsonFile = 'images.json';

// קבלת המידע שנשלח מה-POST
$input = json_decode(file_get_contents('php://input'), true);

// בדיקה שיש URL
if (isset($input['imageUrl'])) {
    $imageUrl = $input['imageUrl'];

    // אם הקובץ קיים, טען אותו, אחרת התחל עם מערך ריק
    if (file_exists($jsonFile)) {
        $images = json_decode(file_get_contents($jsonFile), true);
        if (!$images) {
            $images = [];
        }
    } else {
        $images = [];
    }

    // הוספת הכתובת החדשה למערך
    $images[] = $imageUrl;

    // שמירה מחדש לקובץ JSON
    file_put_contents($jsonFile, json_encode($images, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "No image URL provided."]);
}
?>
