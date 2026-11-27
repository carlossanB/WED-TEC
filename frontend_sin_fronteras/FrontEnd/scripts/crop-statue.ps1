Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Carlos.buitron\Desktop\Proyecto tec\frontend_sin_fronteras\FrontEnd\src\assets\icons\logo_sin_fronteras-removebg-preview.png"
$destBlue = "C:\Users\Carlos.buitron\Desktop\Proyecto tec\frontend_sin_fronteras\FrontEnd\src\assets\icons\statue_symbol.png"
$destWhite = "C:\Users\Carlos.buitron\Desktop\Proyecto tec\frontend_sin_fronteras\FrontEnd\src\assets\icons\statue_symbol_white.png"
$artifactBlue = "C:\Users\Carlos.buitron\.gemini\antigravity\brain\49c4f305-0016-46e8-927f-01aae3be4f40\statue_symbol.png"
$artifactWhite = "C:\Users\Carlos.buitron\.gemini\antigravity\brain\49c4f305-0016-46e8-927f-01aae3be4f40\statue_symbol_white.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Erase the letters 'SIN FRONTERAS' at the bottom
# The letters are below the statue robe.
# At x < 150, y > 325, it's the letters 'SIN'
# Let's inspect and remove any pixels below y = 330 that are part of letters:
for ($y = 330; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt 150; $x++) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
    }
}
# Also remove anything below y = 350 across the whole width
for ($y = 350; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
    }
}

# Find new tight bounding box for the statue
$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt 350; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 25) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$width = $maxX - $minX + 1
$height = $maxY - $minY + 1

$rect = [System.Drawing.Rectangle]::new($minX, $minY, $width, $height)
$statueBlue = $bmp.Clone($rect, $bmp.PixelFormat)

# Create white variant:
# If pixel is yellow/gold (R > 180, G > 120, B < 80), KEEP IT YELLOW!
# If pixel is blue/dark (R < 100, B > 60 or dark), turn it into pure WHITE with same alpha!
$statueWhite = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $p = $statueBlue.GetPixel($x, $y)
        if ($p.A -gt 15) {
            # Is it torch flame (yellow/orange/gold)?
            if ($p.R -gt 150 -and $p.G -gt 110 -and $p.B -lt 100) {
                # Keep flame yellow
                $statueWhite.SetPixel($x, $y, $p)
            } else {
                # Turn statue blue/dark into crisp white
                $newColor = [System.Drawing.Color]::FromArgb($p.A, 255, 255, 255)
                $statueWhite.SetPixel($x, $y, $newColor)
            }
        } else {
            $statueWhite.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$statueBlue.Save($destBlue, [System.Drawing.Imaging.ImageFormat]::Png)
$statueBlue.Save($artifactBlue, [System.Drawing.Imaging.ImageFormat]::Png)
$statueWhite.Save($destWhite, [System.Drawing.Imaging.ImageFormat]::Png)
$statueWhite.Save($artifactWhite, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$statueBlue.Dispose()
$statueWhite.Dispose()
Write-Host "Both blue and white statue symbols generated cleanly!"
