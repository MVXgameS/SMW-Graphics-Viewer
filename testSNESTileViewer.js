const canvas = document.getElementById('tileCanvas');
const ctx = canvas.getContext('2d');
const SCALE = 4;
const TILE_SIZE = 8;
const TILE_BYTES = 32;
const TILES_PER_ROW = canvas.width / (TILE_SIZE * SCALE);

//Presets
const gfxPresets = [
  { name: "GFX00", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX00.bin" },
  { name: "GFX01", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Graphics/GFX01.bin" },
];

const palettePresets = [
  { name: "Palette 0", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Palette00.pal" },
  { name: "Palette 1", path: "https://raw.githubusercontent.com/MVXgameS/SMW-Graphics-Viewer/82476531ec17a79539609265ad2fb2454cea091f/Palettes/Palette01.pal" },
];

const gfxSelect = document.getElementById("gfxPreset");
const palSelect = document.getElementById("palettePreset");

let currentPalette = [];

function initPresets() {
  gfxPresets.forEach((preset, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = preset.name;
    gfxSelect.appendChild(opt);
  });

  palettePresets.forEach((preset, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = preset.name;
    palSelect.appendChild(opt);
  });

  gfxSelect.addEventListener("change", () => loadGFXPreset(gfxPresets[gfxSelect.value]));
  palSelect.addEventListener("change", () => loadPalettePreset(palettePresets[palSelect.value]));

  // Load default
  loadGFXPreset(gfxPresets[0]);
  loadPalettePreset(palettePresets[0]);
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
        drawTiles(data);
      })
      .catch(error => {
        console.error(error);  // Log the error if fetching fails
      });
  }

function loadPalettePreset(preset) {
  fetch(preset.path)
    .then(res => res.arrayBuffer())
    .then(buffer => {
      const view = new DataView(buffer);
      currentPalette = [];
      for (let i = 0; i < buffer.byteLength; i += 2) {
        const color = view.getUint16(i, true);
        currentPalette.push(snesColorToHex(color));
      }
      renderPalette();
    });
}

function snesColorToHex(color) {
  const r = (color & 0x1F) << 3;
  const g = ((color >> 5) & 0x1F) << 3;
  const b = ((color >> 10) & 0x1F) << 3;
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
}

function renderPalette() {
  const container = document.getElementById('paletteDisplay');
  container.innerHTML = '';
  currentPalette.forEach(color => {
    const swatch = document.createElement('div');
    swatch.style.backgroundColor = color;
    const hex = document.createElement('div');
    hex.className = 'hex';
    hex.textContent = color;
    swatch.appendChild(hex);
    container.appendChild(swatch);
  });
}

function drawTiles(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const tiles = Math.floor(data.length / TILE_BYTES);

  for (let t = 0; t < tiles; t++) {
    const tileX = (t % TILES_PER_ROW) * TILE_SIZE * SCALE;
    const tileY = Math.floor(t / TILES_PER_ROW) * TILE_SIZE * SCALE;
    drawTile(data.slice(t * TILE_BYTES, (t + 1) * TILE_BYTES), tileX, tileY);
  }
}

function drawTile(tileBytes, x, y) {
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

      const color = currentPalette[colorIndex] || '#000000';
      ctx.fillStyle = color;
      ctx.fillRect(x + col * SCALE, y + row * SCALE, SCALE, SCALE);
    }
  }
}

initPresets();