$lines = Get-Content 'index.html'

$nav = $lines[0..148]
$footer = $lines[921..($lines.Length-1)]

$bookings = $nav + $lines[428..560] + $footer
$bookings | Set-Content 'bookings.html' -Encoding UTF8

$about = $nav + $lines[611..654] + $footer
$about | Set-Content 'about.html' -Encoding UTF8

$contact = $nav + $lines[834..920] + $footer
$contact | Set-Content 'contact.html' -Encoding UTF8
