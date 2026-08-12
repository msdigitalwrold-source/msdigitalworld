$files = @("tourist-places.html", "bookings.html", "about.html", "contact.html")

$newNav = @"
            <div class="nav-menu" id="nav-menu">
                <a href="index.html" class="nav-link">Home</a>
                <a href="tourist-places.html" class="nav-link">Tourist Place</a>
                <a href="bookings.html" class="nav-link">Bookings</a>
                <a href="about.html" class="nav-link">About</a>
                <a href="contact.html" class="nav-link">Contact</a>
                <a href="book.html" class="nav-cta" id="nav-cta-book">
                    <i class="bi bi-calendar-check-fill"></i> Book Now
                </a>
            </div>
"@

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    $content = $content -replace '(?s)<div class="nav-menu" id="nav-menu">.*?</div>', $newNav
    $content | Set-Content $file -Encoding UTF8
}
