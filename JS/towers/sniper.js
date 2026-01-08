import { Tower, Bullet } from "./objects.js";

export class Sniper extends Tower {
  constructor(position) {
    super(1000, 1, 100, position, "green", 0);
  }

  update(ctx) {
    super.update(ctx);
    if (this.target) {
      this.shoot(this.target);
    }
  }

  shoot(target) {
    if (this.cooldown <= 0) {
      this.angle = this.pythagoras(target);
      let bullets = [];
      bullets.push(
        new SniperBullet(
          { x: this.position.x + 25, y: this.position.y + 25 },
          7,
          this.angle,
          true,
          200,
          target
        )
      );
      this.cooldown = this.fireRate;
    }
  }
}

class SniperBullet extends Bullet {
  constructor(position, speed, angle, active, damage, enemy) {
    super(position, speed, angle, active, damage, enemy);
  }
}
