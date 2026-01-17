import { enemies, mgx, fg, fgx } from "/JS/gejm.js";

export class Tower {
  constructor(range, fireRate, cost, position, color, angle = 0, cooldown = 0) {
    this.range = range;
    this.fireRate = fireRate;
    this.cost = cost;
    this.position = { x: position.x * 50, y: position.y * 50 };
    this.color = color;
    this.angle = angle;
    this.cooldown = cooldown;
    this.target = null;
  }
  update() {
    fgx.save();
    fgx.fillStyle = this.color;
    fgx.beginPath();
    fgx.arc(this.position.x + 25, this.position.y + 25, 20, 0, Math.PI * 2);
    fgx.fill();
    fgx.restore();

    if (enemies.length === 0) return;
    this.target = this.calcClosestEnemy(enemies);
    if (this.target == null) return;
    this.angle = this.pythagoras(this.target);
    this.shoot(this.target);
  }

  pythagoras(enemy) {
    const epos = enemy.position;
    let dx = epos.x - this.position.x;
    let dy = epos.y - this.position.y;
    return Math.atan2(dy, dx);
  }

  shoot(target) {
    // To be implemented in subclasses
  }

  calcClosestEnemy(enemies) {
    let closestEnemy = null;
    enemies.forEach((enemy) => {
      if (!enemy) return;
      if (enemy.alive) {
        const distance = this.claclDistance(enemy);
        if (distance < this.range) {
          closestEnemy = enemy;
        }
      }
    });
    return closestEnemy;
  }

  claclDistance(enemy) {
    const epos = enemy.position;
    const dx = epos.x - this.position.x;
    const dy = epos.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  remove() {
    fgx.clearRect(this.position.x - 1, this.position.y - 1, 52, 52);
  }
}

//BULLETS

export class Bullet {
  constructor(position, speed, angle, active, damage, enemy) {
    this.position = position;
    this.speed = speed;
    this.angle = angle;
    this.active = active;
    this.damage = damage;
    this.enemy = enemy;
  }
  update() {
    if (!this.active) return;

    mgx.save();
    mgx.clearRect(this.position.x - 8, this.position.y - 8, 16, 16);
    mgx.translate(this.position.x, this.position.y);
    mgx.rotate(this.angle);
    mgx.beginPath();
    mgx.arc(0, 0, 7, 0, Math.PI * 2);
    mgx.fillStyle = "black";
    mgx.fill();
    mgx.restore();

    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;

    if (!this.enemy) return;
    if (this.enemy.alive && this.ContactBool(this.enemy)) {
      this.active = false;
      mgx.clearRect(this.position.x - 9, this.position.y - 9, 18, 18);
      if (this.enemy.health - this.damage <= 0) {
        this.enemy.alive = false;
        this.enemy.health = 0;
      } else {
        this.enemy.health -= this.damage;
      }
      this.position.x = -100;
      this.position.y = -100;
    }

    if (
      this.position.x > fg.width ||
      this.position.x < 0 ||
      this.position.y > fg.height ||
      this.position.y < 0
    ) {
      this.active = false;
      mgx.clearRect(this.position.x - 9, this.position.y - 9, 18, 18);
      this.position.x = -100;
      this.position.y = -100;
    }
  }

  ContactBool(enemy) {
    const epos = enemy.position;
    const dx = epos.x - this.position.x;
    const dy = epos.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 75 ? true : false;
  }
}
