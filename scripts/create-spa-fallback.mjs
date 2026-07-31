import { copyFile } from "node:fs/promises";

const buildDirectory = new URL("../dist/", import.meta.url);

await copyFile(
  new URL("index.html", buildDirectory),
  new URL("404.html", buildDirectory)
);
