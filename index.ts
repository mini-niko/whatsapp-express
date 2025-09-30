import dotenv from "dotenv";
dotenv.config();

import whatsapp from "./src/whatsapp";
import express from "./src/express";

console.clear();

(async () => {
  const client = await whatsapp.setup();
  await express.setup(client);
})();
