<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $longUrl = $_POST["url"];

  // Generate a short code for the URL
  $shortCode = generateShortCode($longUrl);

  // Save the short code and long URL in a database or file
  saveUrl($shortCode, $longUrl);

  // Return the short URL to the client
  echo "http://localhost/shorten.php?c=$shortCode";
}

function generateShortCode($longUrl) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $shortCode = '';
  $length = strlen($characters);

  for ($i = 0; $i < 6; $i++) {
    $shortCode .= $characters[rand(0, $length - 1)];
  }

  return $shortCode;
}

function saveUrl($shortCode, $longUrl) {
  // Save the short code and long URL in a database or file
  // For demo purposes, we'll just save it in a text file
  $data = "$shortCode,$longUrl\n";
  file_put_contents("urls.txt", $data, FILE_APPEND);
}

if (isset($_GET["c"])) {
  $shortCode = $_GET["c"];

  // Retrieve the long URL from the database or file
  $longUrl = getLongUrl($shortCode);

  if ($longUrl) {
    // Redirect the client to the long URL
    header("Location: $longUrl");
    exit;
  } else {
    // Short code not found
    header("HTTP/1.1 404 Not Found");
    echo "Short code not found.";
    exit;
  }
}

function getLongUrl($shortCode) {
  $lines = file("urls.txt");

  foreach ($lines as $line) {
    $parts = explode(",", $line);
    if ($parts[0] == $shortCode) {
      return trim($parts[1]);
    }
  }

  return false;
}

?>
