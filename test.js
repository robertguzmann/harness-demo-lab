const assert = require("assert");

const message = "Harness Demo Lab is running.";

assert.strictEqual(message.includes("Harness"), true);

console.log("Tests passed.");
