export let round = 0;

import { mapping } from "/maps/mapping.js";

export let towers = [];
export let enemies = [];
export let map = new mapping();

import { Normal } from "/JS/enemies/normal.js";
import { Fast } from "/JS/enemies/sprinter.js";
import { Heavy } from "/JS/enemies/tank.js";

let playerHealth = 100;
const healthDisplay = document.getElementById("health");
healthDisplay.innerText = `Health: ${playerHealth}`;
export function damagePlayer(amount) {
  playerHealth -= amount;
  healthDisplay.innerText = `Health: ${playerHealth}`;
  if (playerHealth <= 0) {
  }
}

let stop = false;
let frame = 0;

export const bg = document.getElementById("bg");
export const mg = document.getElementById("mg");
export const fg = document.getElementById("fg");
export const bgx = bg.getContext("2d");
export const mgx = mg.getContext("2d");
export const fgx = fg.getContext("2d");

window.setRound = function (value) {
  round = value;
  return "Round set to " + round;
};

const framer = document.getElementById("frame");
const rounder = document.getElementById("round");
const stater = document.getElementById("status");

const start = document.getElementById("start");
start.addEventListener("click", () => {
  start.style.display = "none";
  map = new mapping();
  for (let path of map.enemyPath) {
    bgx.fillStyle = "brown";
    bgx.fillRect(path.x * 50, path.y * 50, 50, 50);
  }
  gameLoop();
});

const worker = new Worker("/maps/spawning.js", { type: "module" });
let spawning = false;
worker.onmessage = function (e) {
  switch (e.data) {
    case "spawning":
      spawning = true;
      stater.innerText = "Spawning...";
      break;
    case "done":
      spawning = false;
      stater.innerText = "Waiting...";
      break;
    default:
      if (e.data.push) {
        eval(e.data.push);
      }
      break;
  }
};

export async function addRounds() {
  await asyncMessage({ waves: map.waves });
  map.generateWave();
  round++;
}

function update() {
  for (let tower of towers) {
    tower.update();
  }
  if (enemies.length === 0) {
    if (!spawning) {
      addRounds();
    }
  }
  for (let enemy of enemies) {
    if (!enemy.alive) {
      enemy.clear();
      enemies.splice(enemies.indexOf(enemy), 1);
    }
    enemy.update();
  }
}

function asyncMessage(msg) {
  if (stop) return;
  return new Promise((resolve) => {
    const handler = (e) => {
      resolve(e.data);
      worker.removeEventListener("message", handler);
    };

    worker.addEventListener("message", handler);
    worker.postMessage(msg);
  });
}

function gameLoop() {
  update();
  frame++;
  framer.innerText = `Frame: ${frame}`;
  rounder.innerText = `Round: ${round}`;
  if (stop) return;
  requestAnimationFrame(gameLoop);
}

for (let i = 0; i <= 5; i++) {
  const slot = document.getElementById(`slot-${i}`);
  slot.addEventListener("click", () => {
    const selectedTower = slot.value;
    map.setTower(i, selectedTower);
  });
}

export function revertChoice(element, previousValue) {
  element.value = previousValue;
}

window.getData = function () {
  return { towers: towers, enemies: enemies, map: map };
};

worker.onerror = function (e) {
  console.error("Worker error: ", e.message);
};
console.log("Main thread initialized");

window.getStatus = function () {
  return spawning;
};
window.getMap = function () {
  return map;
};
window.stopSpawning = function () {
  stop = false;
};
