import fs from "fs";
import path from "path";
import { Router } from "express";

const router = Router();

function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

const files = fs.readdirSync(__dirname);

files.forEach((file) => {
  if (file === "index.ts") return;

  import(path.join(__dirname, file)).then((module) => {
    const route = module.default;
    const routeName = "/" + toKebabCase(file.replace(".ts", ""));
    router.use(routeName, route);

    console.log("\x1b[32m", `[Routes] Rota registrada: ${routeName}`);
  });
});

export default router;
