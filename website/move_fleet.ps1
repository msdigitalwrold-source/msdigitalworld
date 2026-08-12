$lines = Get-Content 'index.html'

$part1 = $lines[0..381]
$services = $lines[382..427]
$fleet = $lines[428..559]
$part2 = $lines[560..($lines.Length-1)]

$newLines = $part1 + $fleet + $services + $part2

$newLines | Set-Content 'index.html' -Encoding UTF8
