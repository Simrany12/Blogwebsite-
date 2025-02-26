<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root";  // Change if needed
$pass = "";      // Change if needed
$dbname = "blog_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Fetch all posts
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM posts ORDER BY created_at DESC");
    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    echo json_encode($posts);
}

// Add a new post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $conn->real_escape_string($data["title"]);
    $content = $conn->real_escape_string($data["content"]);

    if ($conn->query("INSERT INTO posts (title, content) VALUES ('$title', '$content')")) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Failed to add post"]);
    }
}

$conn->close();
?>
