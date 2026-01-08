import { Enemy } from "./objects.js";
import { round } from "/JS/gejm.js";

export class Normal extends Enemy {
  constructor(position) {
    let speed = 1 + round * 0.05;
    let health = 100 + round * 10;
    let reward = 10 + round * 2;
    super(position, speed, health, reward, "red");
  }
}
