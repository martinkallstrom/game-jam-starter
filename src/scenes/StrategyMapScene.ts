import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';

export class StrategyMapScene extends Phaser.Scene {
  private gridEngine!: GridEngine;

  constructor() {
    super('StrategyMapScene');
  }

  preload() {
    this.load.image('tiles', '@assets/images/tiles.png');
    this.load.tilemapTiledJSON('tilemap', '@assets/tilemaps/strategy-map.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('tiles');
    if (!tileset) {
        console.error('Tileset "tiles" not found in tilemap.');
        return; // Prevent further execution if tileset is null
    }
    const layer = map.createLayer(0, tileset, 0, 0);

    // Define the configuration for GridEngine
    const gridEngineConfig = {
      characters: [
        // Define your characters here
        // Example:
        // {
        //   id: "player",
        //   sprite: playerSprite,
        //   walkingAnimationMapping: 6,
        //   startPosition: { x: 1, y: 1 },
        // }
      ],
      // Include other configuration options as needed
    };

    // Initialize GridEngine with the map and configuration
    this.gridEngine = new GridEngine(this);
    this.gridEngine.create(map, gridEngineConfig);

    // Load the map layout from the text file
    this.loadMapFromText('@maps/strategy-map.txt');
  }

  private loadMapFromText(mapFile: string) {
    this.load.text('mapData', mapFile);
    this.load.once('complete', () => {
      const data = this.cache.text.get('mapData');
      const rows = data.split('\n');
      const height = rows.length;
      const width = rows[0].length;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const tile = rows[y][x];
          if (tile === '#') {
            //this.gridEngine.setTileAt({ x, y }, 'wall');
          } else if (tile === ' ') {
            //this.gridEngine.setTileAt({ x, y }, 'floor');
          }
        }
      }
    });
    this.load.start();
  }
}