import { Enemy } from "./objects.js";
import { round } from "/JS/gejm.js";

export class Fast extends Enemy {
  constructor(position) {
    let speed = 2 + round * 0.1;
    let health = 75 + round * 8;
    let reward = 8 + round * 2;
    super(position, speed, health, reward, "yellow");
  }
}
