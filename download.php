<?php
// Force the file download
$file = 'https://sensualawakenings.b-cdn.net/Sensual-Awakenings-7.0.1.apk';

// Send headers so browser downloads it
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($file) . '"');
header('Content-Length: ' . filesize($file));
readfile($file);

// After sending file, redirect to thank-you page
header("Location: https://sensualawakenings.today/thankyou");
exit;
?>