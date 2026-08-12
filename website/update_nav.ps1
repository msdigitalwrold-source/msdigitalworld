$files = @("index.html", "tourist-places.html", "bookings.html", "about.html", "contact.html")

$oldNav = @"
                <a href="#hero" class="nav-link active" data-section="hero">Home</a>
                <a href="tourist-places.html" class="nav-link" data-section="packages">Tourist Place</a>
                <a href="#fleet" class="nav-link" data-section="fleet">Bookings</a>
                <a href="#about" class="nav-link" data-section="about">About</a>
                <a href="#contact" class="nav-link" data-section="contact">Contact</a>
"@

$newNav = @"
                <a href="index.html" class="nav-link">Home</a>
                <a href="tourist-places.html" class="nav-link">Tourist Place</a>
                <a href="bookings.html" class="nav-link">Bookings</a>
                <a href="about.html" class="nav-link">About</a>
                <a href="contact.html" class="nav-link">Contact</a>
"@

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    $content = $content -replace [regex]::Escape($oldNav), $newNav
    $content | Set-Content $file -Encoding UTF8
}
