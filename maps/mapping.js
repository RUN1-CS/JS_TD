import { Stacker } from "/JS/towers/stacker.js";
import { Sniper } from "/JS/towers/sniper.js";

import { towers, fgx, round } from "/JS/gejm.js";

export class mapping {
  constructor() {
    this.entryPoint = { x: 0, y: Math.floor(Math.random() * 10) };
    console.log("Entry Point:", this.entryPoint);
    this.enemyPath = this.generatePath(0);
    this.exitPoint = this.enemyPath[this.enemyPath.length - 1];
    this.towers = this.generateTowers(5);
    this.waves = [];
    this.generateWave();
  }

  generatePath(desiredLength) {
    this.enemyPath = [];
    console.log(this.entryPoint);
    this.entryPoint = { x: 0, y: Math.floor(Math.random() * 10) };
    this.enemyPath.push(this.entryPoint);
    console.log(this.entryPoint.y + " " + this.enemyPath[0].y);
    let strikes = 0;
    while (this.enemyPath[this.enemyPath.length - 1].x < 10) {
      let nextStep = Math.floor(Math.random() * 3);
      if (strikes >= 3) {
        nextStep = 1;
        strikes = 0;
      }
      switch (nextStep) {
        case 0:
          if (this.enemyPath[this.enemyPath.length - 1].y == 9) {
            strikes++;
            break;
          }
          this.enemyPath.push({
            x: this.enemyPath[this.enemyPath.length - 1].x,
            y: this.enemyPath[this.enemyPath.length - 1].y + 1,
          });
          break;
        case 1:
          this.enemyPath.push({
            x: this.enemyPath[this.enemyPath.length - 1].x + 1,
            y: this.enemyPath[this.enemyPath.length - 1].y,
          });
          break;
        case 2:
          if (this.enemyPath[this.enemyPath.length - 1].y == 0) {
            strikes++;
            break;
          }
          this.enemyPath.push({
            x: this.enemyPath[this.enemyPath.length - 1].x,
            y: this.enemyPath[this.enemyPath.length - 1].y - 1,
          });
          break;
      }
    }
    if (desiredLength != 0 ? desiredLength != this.enemyPath.length : false) {
      return this.generatePath(desiredLength);
    } else {
      return this.enemyPath;
    }
  }

  generateTowers(NumberOfTowers) {
    let towers = [];
    for (let i = 0; i < NumberOfTowers; ++i) {
      let position = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
      if (
        position.x * 50 > 450 ||
        position.y * 50 < 50 ||
        position.y * 50 > 450 ||
        position.x * 50 < 50
      ) {
        i--;
        position = null;
        continue;
      }
      for (let pos of this.enemyPath) {
        if (pos.x == position.x && pos.y == position.y) {
          i--;
          position = null;
          break;
        }
      }
      if (position == null) continue;
      towers.push({ x: position.x, y: position.y, tower: null });
    }
    return towers;
  }

  generateWave() {
    this.waves = [];
    this.waves.push({
      type: "normal",
      count: Math.floor((5 * (round ? round : 1)) / 4),
      interval: 1000 - round * 100,
    });
    if (round >= 5) {
      this.waves.push({
        type: "tank",
        count: Math.floor((10 * (round ? round : 1)) / 12),
        interval: 1500 - round * 50,
      });
    }
    if (round >= 10) {
      this.waves.push({
        type: "fast",
        count: Math.floor((15 * (round ? round : 1)) / 16),
        interval: 1200 - round * 30,
      });
    }
  }

  setTower(position, tower) {
    let pt = this.towers[position];
    if (!pt) return;
    let newTower;
    switch (tower) {
      case "stacker":
        if (pt.tower) {
          pt.tower.remove(fgx);
        }
        newTower = new Stacker({ x: pt.x, y: pt.y });
        towers.push(newTower);
        pt.tower = newTower;
        break;
      case "sniper":
        if (pt.tower) {
          pt.tower.remove(fgx);
        }
        newTower = new Sniper({ x: pt.x, y: pt.y });
        towers.push(newTower);
        pt.tower = newTower;
        break;
      case "None":
        if (pt.tower == null || pt.tower == undefined) return;
        pt.tower.remove(fgx);
        pt.tower = null;
        break;
      default:
        console.log("Unknown tower type:", tower);
    }
  }
}
