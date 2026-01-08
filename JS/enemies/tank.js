import { Enemy } from "./objects.js";
import { round } from "/JS/gejm.js";

export class Heavy extends Enemy {
  constructor(position) {
    let speed = 0.5 + round * 0.03;
    let health = 200 + round * 20;
    let reward = 20 + round * 5;
    super(position, speed, health, reward, "grey");
  }
}
