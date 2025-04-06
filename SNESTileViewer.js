const canvas = document.getElementById('tileCanvas');
const ctx = canvas.getContext('2d');
const SCALE = 4;
const TILE_SIZE = 8;
const TILE_BYTES = 32;
const TILES_PER_ROW = canvas.width / (TILE_SIZE * SCALE);

// Presets
const gfxPresets = [
  { name: "GFX00", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX00.bin" },
  { name: "GFX01", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX01.bin" },
  { name: "GFX02", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX02.bin" },
  { name: "GFX03", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX03.bin" },
  { name: "GFX04", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX04.bin" },
  { name: "GFX05", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX05.bin" },
  { name: "GFX06", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX06.bin" },
];

const palettePresets = [
  { name: "Castle", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Castle.pal" },
  { name: "Cave", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Cave.pal" },
  { name: "Ghost House", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/GhostHouse.pal" },
  { name: "Switch Palace", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/SwitchPalace.pal" },
  { name: "Underwater", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Underwater.pal" },
  { name: "YoshiHouse", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/YoshiHouse.pal" },
  { name: "Cave", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Cave.pal" },
  { name: "Cave", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Cave.pal" },
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

function loadGFXPreset(preset) {
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
      drawTiles(gfxData, currentPalette); // Draw the tiles after loading the gfx
    })
    .catch(error => {
      console.error('Error loading GFX:', error);
    });
}

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
      redrawGraphics(currentPalette);  // Redraw all the graphics using the updated palette
    })
    .catch(error => {
      console.error('Error loading Palette:', error);
    });
}

function updatePaletteGroup() {
  const offset = currentPaletteOffset * 16;  // Calculate the starting index based on offset
  const newPalette = currentPalette.slice(offset, offset + 16);  // Slice the palette to show the correct colors

  console.log('New Palette Group:', newPalette);  // Debugging: See the palette being sliced

  renderPalette(newPalette);
  redrawGraphics(newPalette);  // Pass newPalette to redrawGraphics
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
    drawTiles(gfxData, newPalette);  // Pass newPalette to drawTiles
  } else {
    console.log('No GFX Data available for redrawing.');
  }
}

// Draw Graphics
function drawTiles(data, newPalette) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const tiles = Math.floor(data.length / TILE_BYTES);

  for (let t = 0; t < tiles; t++) {
    const tileX = (t % TILES_PER_ROW) * TILE_SIZE * SCALE;
    const tileY = Math.floor(t / TILES_PER_ROW) * TILE_SIZE * SCALE;
    drawTile(data.slice(t * TILE_BYTES, (t + 1) * TILE_BYTES), tileX, tileY, newPalette);  // Pass newPalette
  }
}

function drawTile(tileBytes, x, y, newPalette) {
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

      const color = newPalette[colorIndex] || '#000000'; // Use the newPalette for colors
      ctx.fillStyle = color;
      ctx.fillRect(x + col * SCALE, y + row * SCALE, SCALE, SCALE);
    }
  }
}

initPresets();