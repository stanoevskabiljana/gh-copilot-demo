# Album API v2 - Manual Testing Script
# Run this script to test all API endpoints

$baseUrl = "http://localhost:3000"

Write-Host "🎵 Testing Album API v2" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "1. Testing Health Check (GET /)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/" -UseBasicParsing
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($response.Content | ConvertFrom-Json | ConvertTo-Json -Compress)`n"
} catch {
    Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
}

# Test 2: Get All Albums
Write-Host "2. Testing Get All Albums (GET /albums)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/albums" -UseBasicParsing
    $albums = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Found $($albums.Count) albums`n"
} catch {
    Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
}

# Test 3: Get Album by ID
Write-Host "3. Testing Get Album by ID (GET /albums/1)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/albums/1" -UseBasicParsing
    $album = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Album: $($album.title) by $($album.artist.name)`n"
} catch {
    Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
}

# Test 4: Search by Year
Write-Host "4. Testing Search by Year (GET /albums/search?year=2020)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/albums/search?year=2020" -UseBasicParsing
    $albums = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Found $($albums.Count) albums from 2020`n"
} catch {
    Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
}

# Test 5: Create New Album
Write-Host "5. Testing Create Album (POST /albums)" -ForegroundColor Yellow
try {
    $newAlbum = @{
        title = "Test Album"
        artist = @{
            name = "Test Artist"
            birthdate = "1990-01-01"
            birthPlace = "Test City, ST"
        }
        year = 2024
        price = 15.99
        image_url = "https://example.com/test.jpg"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/albums" -Method POST -Body $newAlbum -ContentType "application/json" -UseBasicParsing
    $created = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Created album with ID: $($created.id)`n"
    $createdId = $created.id
} catch {
    Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
}

# Test 6: Update Album
if ($createdId) {
    Write-Host "6. Testing Update Album (PUT /albums/$createdId)" -ForegroundColor Yellow
    try {
        $updatedAlbum = @{
            title = "Updated Test Album"
            artist = @{
                name = "Updated Test Artist"
                birthdate = "1995-06-15"
                birthPlace = "Updated City, ST"
            }
            year = 2024
            price = 19.99
            image_url = "https://example.com/updated.jpg"
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "$baseUrl/albums/$createdId" -Method PUT -Body $updatedAlbum -ContentType "application/json" -UseBasicParsing
        $updated = $response.Content | ConvertFrom-Json
        Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "   Updated album title: $($updated.title)`n"
    } catch {
        Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
    }

    # Test 7: Delete Album
    Write-Host "7. Testing Delete Album (DELETE /albums/$createdId)" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/albums/$createdId" -Method DELETE -UseBasicParsing
        Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "   Album deleted successfully`n"
    } catch {
        Write-Host "   ❌ Failed: $_`n" -ForegroundColor Red
    }
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ API Testing Complete!" -ForegroundColor Green
