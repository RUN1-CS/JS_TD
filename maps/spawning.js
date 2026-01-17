console.log("Spawning worker initialized");

self.addEventListener("message", function (e) {
  this.self.postMessage("spawning");
  console.log("Received message in worker:", e.data.waves);
  const wave = e.data.waves;
  let iterations, interval;
  for (let x = 0; x < wave.length; x++) {
    switch (wave[x].type) {
      case "normal":
        console.log("Spawning normal enemies");
        interval = wave[x].interval;
        iterations = wave[x].count * interval;
        for (let i = 0; i <= iterations; i++) {
          if (i % interval === 0) {
            this.self.postMessage({
              push: `enemies.push(new Normal(structuredClone(map.entryPoint)));`,
            });
          }
        }
        break;
      case "fast":
        console.log("Spawning fast enemies");
        interval = wave[x].interval;
        iterations = wave[x].count * interval;
        for (let i = 0; i <= iterations; i++) {
          if (i % interval === 0) {
            this.self.postMessage({
              push: `enemies.push(new Fast(structuredClone(map.entryPoint)));`,
            });
          }
        }
        break;
      case "tank":
        console.log("Spawning tank enemies");
        interval = wave[x].interval;
        iterations = wave[x].count * interval;
        for (let i = 0; i <= iterations; i++) {
          if (i % interval === 0) {
            this.self.postMessage({
              push: `enemies.push(new Heavy(structuredClone(map.entryPoint)));`,
            });
          }
        }
        break;
    }
  }
  this.self.postMessage("done");
});
