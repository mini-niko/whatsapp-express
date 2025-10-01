import express from "express";
import router from "./routes";

import { whenExpressListening } from "./helpers";
import { WhatsappClient } from "../whatsapp/type";

async function setup(whatsappClient: WhatsappClient | void) {
  console.log("[Express] Iniciando...");

  const app = express();

  app.locals.whatsappClient = whatsappClient;

  app.use(express.json());
  app.use("/api/", router);

  app.listen(Number(process.env.EXPRESS_PORT), "0.0.0.0", whenExpressListening);
}

const expressModule = {
  setup,
};

export default expressModule;
