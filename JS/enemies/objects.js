import { map, damagePlayer, fgx } from "../gejm.js";

export class Enemy {
  constructor(position, speed, health, reward, color, currentPos = 0) {
    this.position = position;
    this.speed = speed;
    this.health = health;
    this.reward = reward;
    this.color = color;
    this.alive = true;
    this.currentPos = currentPos;
  }

  checkProximity() {
    const targetX = map.enemyPath[this.currentPos].x * 50;
    const targetY = map.enemyPath[this.currentPos].y * 50;

    const distX = targetX - this.position.x;
    const distY = targetY - this.position.y;
    if (Math.abs(distX) <= this.speed && Math.abs(distY) <= this.speed) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    const targetX = map.enemyPath[this.currentPos].x * 50;
    const targetY = map.enemyPath[this.currentPos].y * 50;
    if (this.alive) {
      fgx.clearRect(this.position.x, this.position.y, 50, 50);
      fgx.fillStyle = this.color;

      if (this.position.x != targetX) {
        if (this.checkProximity()) {
          this.position.x = targetX;
        } else if (this.position.x < targetX) {
          this.position.x += this.speed;
        } else {
          this.position.x -= this.speed;
        }
      }
      if (this.position.y != targetY) {
        if (this.checkProximity()) {
          this.position.y = targetY;
        } else if (this.position.y < targetY) {
          this.position.y += this.speed;
        } else {
          this.position.y -= this.speed;
        }
      }
      if (
        this.currentPos < map.enemyPath.length - 1 &&
        this.position.x == targetX &&
        this.position.y == targetY
      ) {
        this.currentPos++;
      } else if (
        this.currentPos == map.enemyPath.length - 1 &&
        this.position.x == targetX &&
        this.position.y == targetY
      ) {
        damagePlayer(this.health);
        this.alive = false;
        return;
      }
      fgx.fillRect(this.position.x, this.position.y, 50, 50);
    } else {
      fgx.clearRect(this.position.x, this.position.y, 50, 50);
      this.position = { x: -100, y: -100 };
    }
  }
  clear() {
    fgx.clearRect(this.position.x - 9, this.position.y - 9, 18, 18);
    this.position.x = -100;
    this.position.y = -100;
  }
}
