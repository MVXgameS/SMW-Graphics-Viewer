function createTileMap(coords, description) {
    return coords.reduce((acc, coord) => {
      acc[coord] = description;
      return acc;
    }, {});
  }
  
  const tileDescriptionsByGFX = {
    GFX00: {
    // Sprite Placeholder
        ...createTileMap(
        ["0_0", "32_0", "0_32", "32_32"],
        {
          usage: "This GFX is used when loading a custom graphic that is not native to SMW.",
          palette: "Palette 8",
          type: "Any"
        }
      ),
    // Nintendo Presents
      ...createTileMap(
        [
          "64_0", "64_32", "96_0", "96_32", "128_0", "128_32",
          "160_0", "160_32", "192_0", "192_32", "224_0", "224_32",
          "256_0", "256_32", "288_0", "288_32"
        ],
        {
          usage: "This GFX is used when first starting the game.",
          palette: "Any",
          type: "Any"
        }
      ),
    // Mario 8x8 Tiles
      ...createTileMap(
        [
          "320_0", "320_32", "352_0", "352_32", "384_0", "384_32",
          "416_0", "416_32", "0_64", "0_96", "32_64", "32_96",
          "64_64", "64_96", "96_64", "96_96"
        ],
        {
          usage: "These GFXs are used when mario is performing actions such as swimming or running.",
          palette: "Palette 8",
          type: "Any"
        }
      ),
    // Feather Powerup
      ...createTileMap(
        ["448_0", "448_32", "480_0", "480_32"],
        {
          usage: "This GFX is the feather for the cape powerup used in SMW.",
          palette: "Palette A",
          type: "Any"
        }
      ),
    // Mushroom/1-up
      ...createTileMap(
        ["128_64", "128_96", "160_64", "160_96"],
        {
          usage: "This is the GFX for iconic Super Mario Mushroom Powerup! The only difference between this and the 1-up is the palette.",
          palette: "Palette C/Palette D",
          type: "Any"
        }
      ),
    // Fire Flower
      ...createTileMap(
        ["192_64", "192_96", "224_64", "224_96"],
        {
          usage: "This is the GFX for the Fire Flower Powerup.",
          palette: "Palette D",
          type: "Any"
        }
      ),
    // Springboard
      ...createTileMap(
        ["256_64"],
        {
          usage: "This GFX is used for the Springboard, Frame 1/3.",
          palette: "Palette D",
          type: "Any"
        }
      ),
      ...createTileMap(
        ["384_128"],
        {
          usage: "This GFX is used for the Springboard, Frame 2/3.",
          palette: "Palette D",
          type: "Any"
        }
      ),
      ...createTileMap(
        ["480_192"],
        {
          usage: "This GFX is used for the Springboard, Frame 3/3.",
          palette: "Palette D",
          type: "Any"
        }
      ),
    // 1-up
    ...createTileMap(
        ["192_160", "224_160"],
        {
          usage: "This is the GFX is used for the 1-up. Use alternative palette to switch to Luigi's 1-up",
          palette: "Palette C/Palette D",
          type: "Any"
        }
      ),
    // 2-up
      ...createTileMap(
        ["288_64"],
        {
          usage: "This is the GFX is used for the 2-up.",
          palette: "Palette A",
          type: "Any"
        }
      ),
    // 3-up
    ...createTileMap(
        ["288_96"],
        {
          usage: "This is the GFX is used for the 3-up.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    // 5-up
      ...createTileMap(
        ["256_96"],
        {
          usage: "This is the GFX is used for the 5-up.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    // Score Points
      ...createTileMap(
        ["128_128", "128_160", "160_128", "160_160", "192_128", "224_128"],
        {
          usage: "This is the GFX is used for the points collected by Mario.",
          palette: "Any",
          type: "Any"
        }
      ),
    // Flying ? Block
      ...createTileMap(
        ["320_64", "352_64", "320_96", "352_96"],
        {
          usage: "This GFX is for the Flying ? Block sprite, this is not the same as the normal ? Block Object.",
          palette: "Palette A",
          type: "Any"
        }
      ),
    // Fireball Extension Sprite
    ...createTileMap(
        ["384_64"],
        {
          usage: "This GFX is for the fireballs thrown from the Fire Flower, Frame 1/2.",
          palette: "Palette A",
          type: "Any"
        }
      ),
    ...createTileMap(
        ["416_64"],
        {
          usage: "This GFX is for the fireballs thrown from the Fire Flower, Frame 2/2.",
          palette: "Palette A",
          type: "Any"
        }
      ),
    // Block Destroyed Extension Sprites
    ...createTileMap(
        ["384_96"],
        {
          usage: "This GFX is for when blocks are destroyed in SMW, Frame 1/2.",
          palette: "Palette 8",
          type: "Any"
        }
      ),
    ...createTileMap(
        ["416_96"],
        {
          usage: "This GFX is for when blocks are destroyed in SMW, Frame 2/2.",
          palette: "Palette 8",
          type: "Any"
        }
      ),
    // Used ? Block / Snack Block
    ...createTileMap(
        ["448_64", "480_64", "448_96", "480_96"],
        {
          usage: "This GFX is used when a ? block has been flagged 'used'. Also is used for the snake block in SMW.",
          palette: "Palette 6",
          type: "Any"
        }
      ),
    // Throwable Block
    ...createTileMap(
        ["0_128", "32_128", "0_160", "32_160"],
        {
          usage: "This is the GFX is for the throwable block sprite.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    // Throwable Block
    ...createTileMap(
        ["64_128", "96_128", "64_160", "96_160"],
        {
          usage: "This is the GFX is for the P-switch. Sometimes seen as palette 9 in Ghost Houses.",
          palette: "Palette 9/Palette B",
          type: "Any"
        }
      ),
    // Star Powerup
    ...createTileMap(
        ["256_128", "288_128", "256_160", "288_160"],
        {
          usage: "This is the GFX is for the Super Star Mario Power-up.",
          palette: "Palette A",
          type: "Any"
        }
      ),
    ...createTileMap(
        ["384_160"],
        {
          usage: "This GFX is used for the sparkle that surrounds the player when Mario has the Star Power-up, Frame 1/4.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    ...createTileMap(
        ["384_192"],
        {
          usage: "This GFX is used for the sparkle that surrounds the player when Mario has the Star Power-up, Frame 2/4.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    ...createTileMap(
        ["416_192"],
        {
          usage: "This GFX is used for the sparkle that surrounds the player when Mario has the Star Power-up, Frame 3/4.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    ...createTileMap(
        ["448_192"],
        {
          usage: "This GFX is used for the sparkle that surrounds the player when Mario has the Star Power-up, Frame 4/4.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    // Yoshi Wind Folded
    ...createTileMap(
        ["416_160"],
        {
          usage: "This GFX is used for when Yoshi picks up the wings, Frame 1/2.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    // Sliding Koopa
    ...createTileMap(
        ["448_128", "480_128", "448_160", "480_160"],
        {
          usage: "This GFX is used for the Sliding Koopa Sprite.",
          palette: "Palette B",
          type: "Any"
        }
      ),
    // Puff of Smoke - not done
    ...createTileMap(
        ["", "", "", ""],
        {
          usage: "This GFX is used for the cloud for whenever Mario completes an action. Ex: Jumping/Spinning on enemies.",
          palette: "Any",
          type: "Any"
        }
      ),
    }
  };