import { Tower, Bullet } from "./objects.js";

export class Stacker extends Tower {
  constructor(position) {
    super(300, 0, 0, position, "blue", 0);
    this.bullets = [];
  }

  update(ctx) {
    super.update(ctx);
    if (this.target) {
      this.shoot(this.target);
    }
    if (!this.bullets || !this.target) return;
    for (let bullet of this.bullets) {
      bullet.update(ctx, this.target);
    }
  }

  shoot(target) {
    if (this.cooldown <= 0) {
      this.angle = this.pythagoras(target);
      this.bullets.push(
        new StackerBullet(
          { x: this.position.x + 25, y: this.position.y + 25 },
          5,
          this.angle,
          true,
          50,
          target
        )
      );
      this.cooldown = this.claclDistance(target) / 4;
    } else {
      this.cooldown -= 1;
    }
  }
}

class StackerBullet extends Bullet {
  constructor(position, speed, angle, active, damage, enemy) {
    super(position, speed, angle, active, damage, enemy);
  }
}
