const canvas = document.getElementById('tileCanvas');
const ctx = canvas.getContext('2d');
const gridCanvas = document.getElementById('gridCanvas');
const gridCtx = gridCanvas.getContext('2d');
const SCALE = 4;
const TILE_SIZE = 8;
const TILE_BYTES = 32;
const TILES_PER_ROW = canvas.width / (TILE_SIZE * SCALE);

// Presets
const gfxPresets = [
  { name: "GFX00", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/61f2f7651b0663e279f132f402b2839dbd0d11c3/Graphics/GFX00.bin" },
  { name: "GFX01", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX01.bin" },
  { name: "GFX02", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX02.bin" },
  { name: "GFX03", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX03.bin" },
  { name: "GFX04", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX04.bin" },
  { name: "GFX05", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX05.bin" },
  { name: "GFX06", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX06.bin" },
  { name: "GFX07", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX07.bin" },
  { name: "GFX08", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX08.bin" },
  { name: "GFX09", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX09.bin" },
  { name: "GFX0A", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX0A.bin" },
  { name: "GFX0B", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX0B.bin" },
  { name: "GFX0C", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX0C.bin" },
  { name: "GFX0D", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX0D.bin" },
  { name: "GFX0E", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX0E.bin" },
  { name: "GFX0F", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX0F.bin" },
  { name: "GFX10", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX10.bin" },
  { name: "GFX11", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX11.bin" },
  { name: "GFX12", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX12.bin" },
  { name: "GFX13", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX13.bin" },
  { name: "GFX14", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX14.bin" },
  { name: "GFX15", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX15.bin" },
  { name: "GFX16", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX16.bin" },
  { name: "GFX17", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX17.bin" },
  { name: "GFX18", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX18.bin" },
  { name: "GFX19", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX19.bin" },
  { name: "GFX1A", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX1A.bin" },
  { name: "GFX1B", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX1B.bin" },
  { name: "GFX1C", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX1C.bin" },
  { name: "GFX1D", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX1D.bin" },
  { name: "GFX1E", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX1E.bin" },
  { name: "GFX1F", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX1F.bin" },
  { name: "GFX20", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX20.bin" },
  { name: "GFX21", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX21.bin" },
  { name: "GFX22", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX22.bin" },
  { name: "GFX23", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX23.bin" },
  { name: "GFX24", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX24.bin" },
  { name: "GFX25", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX25.bin" },
  { name: "GFX26", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX26.bin" },
  { name: "GFX27", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX27.bin" },
  { name: "GFX28", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX28.bin" },
  { name: "GFX29", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX29.bin" },
  { name: "GFX2A", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX2A.bin" },
  { name: "GFX2B", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX2B.bin" },
  { name: "GFX2C", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX2C.bin" },
  { name: "GFX2D", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX2D.bin" },
  { name: "GFX2E", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX2E.bin" },
  { name: "GFX2F", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX2F.bin" },
  { name: "GFX30", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX30.bin" },
  { name: "GFX31", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX31.bin" },
  { name: "GFX32", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX32.bin" },
  { name: "GFX33", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX33.bin" },
];

const palettePresets = [
  { name: "Castle", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/68c1ca9d919b1a90eebc04198d66c204a7fbad8f/Palettes/Castle.pal" },
  { name: "Cave", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/68c1ca9d919b1a90eebc04198d66c204a7fbad8f/Palettes/Cave.pal" },
  { name: "Ghost House", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/68c1ca9d919b1a90eebc04198d66c204a7fbad8f/Palettes/GhostHouse.pal" },
  { name: "Switch Palace", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/68c1ca9d919b1a90eebc04198d66c204a7fbad8f/Palettes/SwitchPalace.pal" },
  { name: "Underwater", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/21f55edb040fc0ff07849ae0357cf7abe4d7506f/Palettes/Underwater.pal" },
  { name: "Yoshi's House", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/68c1ca9d919b1a90eebc04198d66c204a7fbad8f/Palettes/YoshiHouse.pal" },
];

const gfxSelect = document.getElementById("gfxPreset");
const palSelect = document.getElementById("palettePreset");

let currentPalette = [];  // Store the full palette here
let currentPaletteOffset = 0; // Offset for selecting which part of the palette to display
let gfxData = null;  // Store the graphics data

// Ensure initPresets is only called once
let presetsInitialized = false;

window.onload = function() {
  if (!presetsInitialized) {
    initPresets();  // Initialize the presets only once
    presetsInitialized = true;  // Mark as initialized
  }

  loadGFXPreset(gfxPresets[0]);  // Load GFX00 as the default graphic
  loadPalettePreset(palettePresets[0]);

  // Set default value for palette offset
  document.getElementById('paletteOffsetSelect').value = 0;
  currentPaletteOffset = 0; // Reset palette offset
  updatePaletteGroup();  // Update the palette group based on the reset offset
};

function initPresets() {
  if (!gfxSelect.hasChildNodes()) {
    gfxPresets.forEach((preset, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = preset.name;
      gfxSelect.appendChild(opt);
    });
  }

  if (!palSelect.hasChildNodes()) {
    palettePresets.forEach((preset, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = preset.name;
      palSelect.appendChild(opt);
    });
  }

  gfxSelect.addEventListener("change", () => loadGFXPreset(gfxPresets[gfxSelect.value]));
  palSelect.addEventListener("change", () => loadPalettePreset(palettePresets[palSelect.value]));

  // Add event listener for the offset dropdown (updates which 16-color group is displayed)
  document.getElementById('paletteOffsetSelect').addEventListener('change', function() {
    currentPaletteOffset = parseInt(this.value);
    updatePaletteGroup();  // This function will update the displayed palette based on offset
  });
}

let currentGFXName = "";

function loadGFXPreset(preset) {
  currentGFXName = preset.name;
  fetch(preset.path)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${preset.path}: ${res.statusText}`);
      }
      return res.arrayBuffer();
    })
    .then(buffer => {
      const data = new Uint8Array(buffer);
      console.log('GFX Data:', data); // Log the data fetched from the .bin file
      gfxData = data;  // Store the graphics data

      // After loading the new GFX, we need to make sure we apply the selected palette
      updatePaletteGroup(); // Apply the current palette and offset immediately
      redrawGraphics(newPalette);  // Redraw the graphics with the correct palette and offset
    })
    .catch(error => {
      console.error('Error loading GFX:', error);
    });
  
  document.getElementById("tileInfo").style.display = "none";

  // Reset the description
  document.getElementById("tileInfo").textContent = "";
  
  // Clear zoom state and canvas
  currentZoomX = null;
  currentZoomY = null;
  zoomCtx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
  zoomCtx.fillStyle = '#444'; // or any background
  zoomCtx.fillRect(0, 0, zoomCanvas.width, zoomCanvas.height);
}

//Load selected palette
function loadPalettePreset(preset) {
  fetch(preset.path)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${preset.path}: ${res.statusText}`);
      }
      return res.arrayBuffer();
    })
    .then(buffer => {
      const view = new DataView(buffer);
      currentPalette = [];

      const start = 0;
      const totalColors = (buffer.byteLength - start) / 3; // 3 bytes per color (RGB)

      for (let i = 0; i < totalColors; i++) {
        const r = view.getUint8(start + i * 3);
        const g = view.getUint8(start + i * 3 + 1);
        const b = view.getUint8(start + i * 3 + 2);

        // Convert RGB to hex
        const hex = `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
        currentPalette.push(hex);
      }

      updatePaletteGroup();  // Update the palette after it's loaded
    })
    .catch(error => {
      console.error('Error loading Palette:', error);
    });
}

//Update palette after switching
function updatePaletteGroup() {
  const offset = currentPaletteOffset * 16;  // Calculate the starting index based on offset
  const newPalette = currentPalette.slice(offset, offset + 16);  // Slice the palette to show the correct colors

  console.log('New Palette Group:', newPalette);  // Debugging: See the palette being sliced

  renderPalette(newPalette);
  redrawGraphics(newPalette);  // Pass newPalette to redrawGraphics

  if (currentZoomX !== null && currentZoomY !== null) {
    drawZoomBlock(currentZoomX, currentZoomY);
  }
}

// Render the palette in the HTML
function renderPalette(palette) {
  const container = document.getElementById('paletteDisplay');
  container.innerHTML = '';  // Clear existing colors

  // Loop through the new palette and display each color
  palette.forEach(color => {
    const swatch = document.createElement('div');
    swatch.style.backgroundColor = color;
    const hex = document.createElement('div');
    hex.className = 'hex';
    hex.textContent = color;
    swatch.appendChild(hex);
    container.appendChild(swatch);
  });
}

// Redraw the graphics after updating palette
function redrawGraphics(newPalette) {
  if (gfxData) {
    console.log('Redrawing Tiles with Updated Palette...');
    drawTiles(newPalette);  // Pass newPalette to drawTiles
  } else {
    console.log('No GFX Data available for redrawing.');
  }
}

// Update drawGrid to ensure correct grid size (16x8)
function drawGrid(ctx, tileWidth = 0, tileHeight = 8, color = 'rgba(255, 255, 255, 0.75)') {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.clearRect(0, 0, width, height); // Clear the grid before redrawing

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  // Vertical lines for 16 tiles horizontally
  for (let x = 0; x <= width; x += tileWidth) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal lines for 8 tiles vertically (adjust this part)
  for (let y = 0; y <= height; y += tileHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

// Draw Graphics - switching palettes doesn't work
function drawTiles(palette = currentPalette) {
  const tileSize = currentMode === 1 ? 16 : currentMode === 2 ? 64 : 32;
  const bytesPerTile = tileSize;
  const totalTiles = Math.floor(gfxData.length / bytesPerTile);

  const tilePixelSize = TILE_SIZE * SCALE;

  // Dynamically calculate how many tiles per row fit in the canvas
  const tilesPerRow = Math.floor(tileCanvas.width / tilePixelSize);
  const rowsVisible = Math.floor(tileCanvas.height / tilePixelSize);
  const maxVisibleTiles = tilesPerRow * rowsVisible;

  ctx.clearRect(0, 0, tileCanvas.width, tileCanvas.height);

  for (let i = 0; i < Math.min(totalTiles, maxVisibleTiles); i++) {
    const tileOffset = i * bytesPerTile;
    const tileBytes = gfxData.slice(tileOffset, tileOffset + bytesPerTile);

    const x = (i % tilesPerRow) * tilePixelSize;
    const y = Math.floor(i / tilesPerRow) * tilePixelSize;

    if (currentMode === 1) {
      draw2bppTile(tileBytes, x, y, palette);
    } else if (currentMode === 2) {
      drawMode7Tile(tileBytes, x, y);
    } else {
      draw4bppTile(tileBytes, x, y, palette);
    }
  }

  drawGrid(gridCtx, tilePixelSize, tilePixelSize);
}

// Mode Select setup
const modeSelect = document.getElementById("modeSelect");
let currentMode = parseInt(modeSelect.value, 10);
modeSelect.addEventListener("change", () => {
  currentMode = parseInt(modeSelect.value, 10);
  if (gfxData && currentPalette.length > 0) {
    updatePaletteGroup();
  }
});

// Decode and draw logic
function drawTile(tileBytes, x, y, newPalette) {
  if (currentMode === 1) {
    drawMode7Tile(tileBytes, x, y);
  } else if (currentMode === 2) {
    draw2bppTile(tileBytes, x, y, newPalette);
  } else {
    draw4bppTile(tileBytes, x, y, newPalette);
  }
}

//works
function draw4bppTile(tileBytes, x, y, newPalette) {
  for (let row = 0; row < 8; row++) {
    const plane0 = tileBytes[row * 2];
    const plane1 = tileBytes[row * 2 + 1];
    const plane2 = tileBytes[row * 2 + 16];
    const plane3 = tileBytes[row * 2 + 17];

    for (let col = 0; col < 8; col++) {
      const bit0 = (plane0 >> (7 - col)) & 1;
      const bit1 = (plane1 >> (7 - col)) & 1;
      const bit2 = (plane2 >> (7 - col)) & 1;
      const bit3 = (plane3 >> (7 - col)) & 1;
      const colorIndex = (bit3 << 3) | (bit2 << 2) | (bit1 << 1) | bit0;

      const color = newPalette[colorIndex] || '#000000';
      ctx.fillStyle = color;
      ctx.fillRect(x + col * SCALE, y + row * SCALE, SCALE, SCALE);
    }
  }
}

//almost works
function draw2bppTile(tileBytes, x, y, newPalette) {
  for (let row = 0; row < 8; row++) {
    const lo = tileBytes[row * 2];     // bitplane 0
    const hi = tileBytes[row * 2 + 1]; // bitplane 1

    for (let col = 0; col < 8; col++) {
      const bit0 = (lo >> (7 - col)) & 1;
      const bit1 = (hi >> (7 - col)) & 1;
      const colorIndex = (bit1 << 1) | bit0;

      const color = newPalette[colorIndex] || '#000000';
      ctx.fillStyle = color;
      ctx.fillRect(x + col * SCALE, y + row * SCALE, SCALE, SCALE);
    }
  }
}

//doesn't work yet
function drawMode7Tile(tileBytes, x, y) {
  // SNES Mode 7 is a bitmap-like 256x256 tilemap
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const index = row * 8 + col;
      const val = tileBytes[index] || 0;
      const hex = val.toString(16).padStart(2, '0');
      const gray = `#${hex}${hex}${hex}`;
      ctx.fillStyle = gray;
      ctx.fillRect(x + col * SCALE, y + row * SCALE, SCALE, SCALE);
    }
  }
}

//Zoom
let currentZoomX = null;
let currentZoomY = null;
const clickCanvas = document.getElementById('clickCanvas');
const zoomCanvas = document.getElementById('zoomCanvas');
const zoomCtx = zoomCanvas.getContext('2d');

const blockSize = 32;     // The size of the block to zoom (in pixels)
const zoomScale = 8;      // How much to zoom

clickCanvas.addEventListener('click', function (e) {
  const rect = clickCanvas.getBoundingClientRect();
  const scaleX = clickCanvas.width / rect.width;
  const scaleY = clickCanvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);

  // Snap to top-left of nearest 32x32 tile
  const tileX = Math.floor(x / 32) * 32;
  const tileY = Math.floor(y / 32) * 32;

  // Store current zoom position
  currentZoomX = tileX;
  currentZoomY = tileY;
  drawZoomBlock(tileX, tileY); // Replace this with your zoom logic

  //descriptions (apart of zoom)
  const key = `${tileX}_${tileY}`;
  const gfxData = tileDescriptionsByGFX[currentGFXName];
  
  if (gfxData && gfxData[key]) {
    const description = gfxData[key];
    document.getElementById("tileInfo").style.display = "block";
    document.getElementById("tileInfo").innerHTML = `
      <strong>Usage:</strong> ${description.usage}<br>
      <strong>Palette:</strong> ${description.palette}<br>
      <strong>Type:</strong> ${description.type}<br>
      <strong>Mode:</strong> ${description.mode}
    `;
  } else {
    document.getElementById("tileInfo").style.display = "block";
    document.getElementById("tileInfo").textContent = "No description available.";
  }
});

function drawZoomBlock(srcX, srcY) {
  const destWidth = blockSize * zoomScale;
  const destHeight = blockSize * zoomScale;
  zoomCanvas.width = destWidth;
  zoomCanvas.height = destHeight;

  zoomCtx.imageSmoothingEnabled = false;
  zoomCtx.clearRect(0, 0, destWidth, destHeight);
  zoomCtx.drawImage(
    tileCanvas,
    srcX, srcY, blockSize, blockSize,
    0, 0, destWidth, destHeight
  );
}
