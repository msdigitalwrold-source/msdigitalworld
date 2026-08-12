$content = Get-Content 'index.html' -Raw -Encoding UTF8
$content = $content.Replace('â€¢', '&bull;')
$content = $content.Replace('â‚¹', '&#8377;')
$content | Set-Content 'index.html' -Encoding UTF8
